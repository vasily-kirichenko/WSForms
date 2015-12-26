(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WSForms,Client,Forms,Form1,UI,Next,Doc,List,AttrProxy,Doc1,Pervasives,Form,View;
 Runtime.Define(Global,{
  WSForms:{
   Client:{
    main:function()
    {
     var x;
     x=Client.personForm({
      Name:"person1",
      Pet:{
       Name:"cat1",
       Kind:{
        $:0
       }
      }
     });
     return Form1.Render(function(personName)
     {
      return function(petName)
      {
       return function(petKind)
       {
        return function(submitPet)
        {
         return function()
         {
          return Doc.Element("div",List.ofArray([AttrProxy.Create("class","form")]),List.ofArray([Doc.Element("label",List.ofArray([AttrProxy.Create("class","form-control")]),List.ofArray([Doc.TextView(personName.get_View())])),Client.renderPet(petName,petKind,submitPet),Doc1.ButtonValidate("OK",List.ofArray([AttrProxy.Create("class","form-control")]),submitPet)]));
         };
        };
       };
      };
     },x);
    },
    personForm:function(person)
    {
     var _arg00_;
     _arg00_=Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Form1.Return(function(name)
     {
      return function(pet)
      {
       return{
        Name:name,
        Pet:pet
       };
      };
     }),Form.Yield(person.Name)),Client.petForm(person.Pet));
     return Form.WithSubmit(_arg00_);
    },
    petForm:function(pet)
    {
     var _arg00_;
     _arg00_=Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Form1.Return(function(name)
     {
      return function(kind)
      {
       return{
        Name:name,
        Kind:kind
       };
      };
     }),Form.Yield(pet.Name)),Form.Yield(pet.Kind));
     return Form.WithSubmit(_arg00_);
    },
    renderPet:function(name,kind)
    {
     var arg20,ats,arg00,arg10;
     ats=List.ofArray([AttrProxy.Create("class","form-control")]);
     arg00=function(_)
     {
      var loop;
      loop=[];
      loop[1]=_;
      loop[0]=1;
      while(loop[0])
       {
        if(loop[1].$==1)
         {
          loop[0]=0;
          loop[1]="Dog";
         }
        else
         {
          loop[0]=0;
          loop[1]="Cat";
         }
       }
      return loop[1];
     };
     arg10=kind.get_View();
     arg20=List.ofArray([Doc.Element("label",List.ofArray([AttrProxy.Create("class","form-control")]),List.ofArray([Doc.TextView(name.get_View())])),Doc.Element("label",ats,List.ofArray([Doc.TextView(View.Map(arg00,arg10))]))]);
     return Doc.Element("div",[],arg20);
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WSForms=Runtime.Safe(Global.WSForms);
  Client=Runtime.Safe(WSForms.Client);
  Forms=Runtime.Safe(Global.WebSharper.Forms);
  Form1=Runtime.Safe(Forms.Form1);
  UI=Runtime.Safe(Global.WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  Doc=Runtime.Safe(Next.Doc);
  List=Runtime.Safe(Global.WebSharper.List);
  AttrProxy=Runtime.Safe(Next.AttrProxy);
  Doc1=Runtime.Safe(Forms.Doc);
  Pervasives=Runtime.Safe(Forms.Pervasives);
  Form=Runtime.Safe(Forms.Form);
  return View=Runtime.Safe(Next.View);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
