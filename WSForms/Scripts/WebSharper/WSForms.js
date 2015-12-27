(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Forms,Pervasives,Form1,Form,Validation,UI,Next,Doc,List,WSForms,Utils,Client,Doc1,M,View,View1,Seq,AttrModule,T,AttrProxy;
 Runtime.Define(Global,{
  WSForms:{
   Client:{
    form:function(person)
    {
     var _arg00_,_arg10_;
     _arg10_=Form.Yield(person.Name);
     _arg00_=Pervasives.op_LessMultiplyGreater(Form1.Return(function(name)
     {
      return{
       Name:name
      };
     }),Validation.IsNotEmpty("Enter a name",_arg10_));
     return Form.WithSubmit(_arg00_);
    },
    main:function()
    {
     return Form1.Render(function(name)
     {
      return function(submit)
      {
       return Doc.Element("div",List.ofArray([Utils.cls("form-inline")]),List.ofArray([Client.render(name,submit.get_View()),Doc1.ButtonValidate("Save",List.ofArray([Utils.cls("form-control")]),submit)]));
      };
     },Client.form({
      Name:"person1"
     }));
    },
    render:function(name,submit)
    {
     return M.simpleInputWithError("Name",name,submit);
    }
   },
   M:{
    inputWithError:function(inputFun,lbl,extras,target,labelExtras,targetExtras,submitView)
    {
     var tv,view,patternInput,errorOpt,errorClassOpt,ats;
     tv=View.Through(submitView,target);
     view=View1.Map(function(res)
     {
      var _,_1,errs,mapping,reduction,list,errors;
      if(res.$==1)
       {
        if(res.$0.$==0)
         {
          _1=[{
           $:0
          },{
           $:0
          }];
         }
        else
         {
          errs=res.$0;
          mapping=function(e)
          {
           return e.get_Text();
          };
          reduction=function(a)
          {
           return function(b)
           {
            return a+"; "+b;
           };
          };
          list=List.map(mapping,errs);
          errors=Seq.reduce(reduction,list);
          _1=[{
           $:1,
           $0:errors
          },{
           $:1,
           $0:"has-error"
          }];
         }
        _=_1;
       }
      else
       {
        _=[{
         $:0
        },{
         $:0
        }];
       }
      return _;
     },tv);
     patternInput=[View1.Map(function(tuple)
     {
      return tuple[0];
     },view),View1.Map(function(tuple)
     {
      return tuple[1];
     },view)];
     errorOpt=patternInput[0];
     errorClassOpt=patternInput[1];
     ats=Seq.toList(Seq.delay(function()
     {
      return Seq.append([Utils.cls("form-group")],Seq.delay(function()
      {
       return Seq.append([AttrModule.DynamicClass("has-error",errorClassOpt,function(opt)
       {
        return opt.$==1;
       })],Seq.delay(function()
       {
        return extras;
       }));
      }));
     }));
     return Doc.Element("div",ats,Seq.toList(Seq.delay(function()
     {
      return Seq.append([Doc.Element("label",labelExtras,List.ofArray([Doc.TextNode(lbl)]))],Seq.delay(function()
      {
       return Seq.append([(inputFun(Runtime.New(T,{
        $:1,
        $0:Utils.cls("form-control"),
        $1:targetExtras
       })))(target)],Seq.delay(function()
       {
        return[Doc.BindView(function(_arg1)
        {
         var _,error;
         if(_arg1.$==1)
          {
           error=_arg1.$0;
           _=Doc.Element("span",List.ofArray([Utils.cls("help-block")]),List.ofArray([Doc.TextNode(error)]));
          }
         else
          {
           _=Doc.get_Empty();
          }
         return _;
        },errorOpt)];
       }));
      }));
     })));
    },
    simpleInputWithError:function(lbl,target,submit)
    {
     return M.inputWithError(function(_arg00_)
     {
      return function(_arg10_)
      {
       return Doc.Input(_arg00_,_arg10_);
      };
     },lbl,Runtime.New(T,{
      $:0
     }),target,Runtime.New(T,{
      $:0
     }),Runtime.New(T,{
      $:0
     }),submit);
    }
   },
   Utils:{
    cls:function(arg00)
    {
     return AttrProxy.Create("class",arg00);
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Forms=Runtime.Safe(Global.WebSharper.Forms);
  Pervasives=Runtime.Safe(Forms.Pervasives);
  Form1=Runtime.Safe(Forms.Form1);
  Form=Runtime.Safe(Forms.Form);
  Validation=Runtime.Safe(Forms.Validation);
  UI=Runtime.Safe(Global.WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  Doc=Runtime.Safe(Next.Doc);
  List=Runtime.Safe(Global.WebSharper.List);
  WSForms=Runtime.Safe(Global.WSForms);
  Utils=Runtime.Safe(WSForms.Utils);
  Client=Runtime.Safe(WSForms.Client);
  Doc1=Runtime.Safe(Forms.Doc);
  M=Runtime.Safe(WSForms.M);
  View=Runtime.Safe(Forms.View);
  View1=Runtime.Safe(Next.View);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  AttrModule=Runtime.Safe(Next.AttrModule);
  T=Runtime.Safe(List.T);
  return AttrProxy=Runtime.Safe(Next.AttrProxy);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
