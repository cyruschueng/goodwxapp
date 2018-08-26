const AV = require('../lib/av-weapp-min');
class Group extends AV.Object{

  get ListId() {

    return this.get('ListId');
  }
  set ListId(value) {
    this.set('ListId', value);
  }
  get User(){
    return this.get('User');
  }
  set User(value){
    this.set('User',value);
  }
  get Count(){
    return this.get('Count');
  }
  set Count(value){
    this.set('Count',value);
  }
  get ImgUrl(){
    return this.get('ImgUrl');
  }
  set ImgUrl(value){
    this.set('ImgUrl',value);
  }
}

AV.Object.register(Group, 'Group');
module.exports = Group;