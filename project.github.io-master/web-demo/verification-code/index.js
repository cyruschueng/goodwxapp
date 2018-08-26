var app = new Vue({
    el : '#app',
    data: {
        code : '',
        codeLength : 6,
        telDisabled: false,
        focused: false
    },
    computed: {
        codeArr() {
            return this.code.split('');
        },
        cursorIndex(){
            return this.code.length;
        }
    },
    watch: {
        code(newVal){
            this.code = newVal.replace(/[^\d]/g,'');
            if(newVal.length > 5){
                this.$refs.vcode.blur();
                setTimeout(()=>{
                    alert(`vcode:${this.code}`);
                },500)
            }
        }
    },
    mounted(){}
});