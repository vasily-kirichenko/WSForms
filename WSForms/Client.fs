namespace WSForms

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Forms

[<AutoOpen; JavaScript>]
module Utils =
    let cls = attr.``class``

[<JavaScript>]
module M =
    let private inputWithError inputFun lbl extras ((target: Var<_>), labelExtras, targetExtras) (submitView: View<Result<_>>) =
        let tv = submitView.Through target
        let errorOpt, errorClassOpt =
            tv.Map (fun res ->
                // Extract a single line of errors, and the optional attribute for them
                match res with
                | Result.Success _
                | Result.Failure [] ->
                    None, None
                | Result.Failure errs ->
                    let errors =
                        errs
                        |> List.map (fun e -> e.Text)
                        |> List.reduce (fun a b -> a + "; " + b)
                    Some errors, Some "has-error"
            )
            |> fun view ->
                view.Map fst, view.Map snd
        divAttr [
            yield cls "form-group"
            yield Attr.DynamicClass "has-error" errorClassOpt (fun opt -> opt.IsSome)
            yield! extras
        ] [
            yield labelAttr labelExtras [text lbl] :> Doc
            yield inputFun (cls "form-control" :: targetExtras) target :> Doc
            yield errorOpt.Doc (function
                | None -> Doc.Empty
                | Some error ->
                    spanAttr [cls "help-block"] [text error] :> Doc
            )
        ]
     
    let simpleInputWithError lbl target submit = inputWithError Doc.Input lbl [] (target, [], []) submit

[<JavaScript>]
module Client = 
    open WebSharper.Forms

    type Person = { Name: string }
    
    let form (person: Person) =
        Form.Return (fun name -> { Name = name })
        <*> (Form.Yield person.Name |> Validation.IsNotEmpty "Enter a name")
        |> Form.WithSubmit

    let render (name: Var<string>) (submit: View<Result<_>>) =
        M.simpleInputWithError "Name" name submit

    let main() =
        form { Name = "person1"}
        |> Form.Render (fun name (submit: Submitter<_>) ->
            divAttr [cls "form-inline"] [ 
                render name submit.View
                Doc.ButtonValidate "Save" [cls "form-control"] submit
            ])
            
//[<JavaScript>]
//module Client = 
//    open WebSharper.Forms
//
//    type PetKind = Cat | Dog
//    type Pet = { Name: string; Kind: PetKind }
//    type Person = { Name: string; Pet: Pet }
//
//    module PetForm =
//        let create (pet: Pet) =
//            Form.Return (fun name kind -> { Name = name; Kind = kind })
//            <*> (Form.Yield pet.Name |> Validation.IsNotEmpty "Enter pet name")
//            <*> Form.Yield pet.Kind
//
//        let render (name: Var<string>) (kind: Var<PetKind>) (submit: View<Result<_>>) =
//            Doc.Concat [
//                M.simpleInputWithError "Name" name submit
//                Doc.Select [cls "form-control"] (sprintf "%A") [Cat; Dog] kind
//            ]
//
////            let submit = submit.Through name
////            let groupAttrs = 
////                [cls "form-group"
////                 Attr.DynamicClass "has-error"
////                    submit
////                    (function Success _ -> true | _ -> false)]
////            Doc.Concat [
////                divAttr groupAttrs [ 
////                    labelAttr [cls "control-label"; attr.``for`` "nameInput"] [
////                        textView (submit |> View.Map (sprintf "%A"))
////                    ]
////                    Doc.Input [cls "form-control"; attr.id "nameInput"] name 
////                ]
////                divAttr groupAttrs [ Doc.Select [cls "form-control"] (sprintf "%A") [Cat; Dog] kind ]
////            ]
//                    
//    module PersonForm =
//        let create person =
//            Form.Return (fun name pet -> { Name = name; Pet = pet })
//            <*> Form.Yield person.Name
//            <*> PetForm.create person.Pet
//            |> Form.WithSubmit
//
//    let main() =
//        PersonForm.create { Name = "person1"; Pet = { Name = "cat1"; Kind = Cat }}
//        |> Form.Render (fun personName petName petKind submit ->
//            divAttr [cls "form"] [ 
//                labelAttr [cls "form-control"] [textView personName.View]
//                PetForm.render petName petKind submit.View
//                //Doc.ButtonValidate "OK" [cls "form-control"] submit
//                Doc.Button "OK" [cls "form-control"] ignore
//            ])