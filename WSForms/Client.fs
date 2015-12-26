namespace WSForms

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html

[<JavaScript>]
module Client = 
    open WebSharper.Forms

    type PetKind = Cat | Dog
    type Pet = { Name: string; Kind: PetKind }
    type Person = { Name: string; Pet: Pet }

    let petForm (pet: Pet) =
        Form.Return (fun name kind -> { Name = name; Kind = kind })
        <*> Form.Yield pet.Name
        <*> Form.Yield pet.Kind
        |> Form.WithSubmit

    let renderPet (name: Var<string>) (kind: Var<PetKind>) submit = 
        div [
            labelAttr [attr.``class`` "form-control"] [textView name.View]
            labelAttr [attr.``class`` "form-control"] [textView (kind.View |> View.Map (sprintf "%A"))]
        ]
        
    let personForm person =
        Form.Return (fun name pet -> { Name = name; Pet = pet })
        <*> Form.Yield person.Name
        <*> petForm person.Pet
        |> Form.WithSubmit

    let main() =
        personForm { Name = "person1"; Pet = { Name = "cat1"; Kind = Cat }}
        |> Form.Render (fun personName petName petKind submitPet submitPerson -> 
            divAttr [attr.``class`` "form"] [ 
                labelAttr [attr.``class`` "form-control"] [textView personName.View]
                renderPet petName petKind submitPet
                Doc.ButtonValidate "OK" [attr.``class`` "form-control"] submitPerson
            ])