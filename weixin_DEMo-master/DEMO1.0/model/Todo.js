const AV=require('../lib/av-weapp-min');

class Todo extends AV.Object{

    get done(){

        return this.get('done');
    }
    set done(value){
        this.set('done',value);
    }

    get Count(){
        return this.get('Count');
    }
    set Count(value){
        this.set('Count',value);
    }
    get ContD(){
        return this.get('ContD');
    }
    set ContD(value){
        this.set('ContD',value);
    }

    get Days(){
        return this.get('Days');
    }
    set Days(value){
        this.set('Days',value);
    }
    get Jin(){
        return this.get('Jin');
    }
    set Jin(value){
        this.set('Jin',value);
    }
    get T_name(){
        return this.get('T_name');
    }
    set T_name(value){
        this.set('T_name',value);
    }
    get T_con(){
        return this.get('T_con');
    }
    set T_con(value){
        this.set('T_con',value);
    }
    get Tag(){
      return this.get('Tag');
    }
    set Tag(value){
      this.set('Tag',value);
    }
}

AV.Object.register(Todo,'Todo');
module.exports=Todo;