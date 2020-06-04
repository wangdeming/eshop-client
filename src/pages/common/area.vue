<script type="text/ecmascript-6">
  export default {
    props: {
      value: {}
    },
    data() {
      return {
        selected: [],
        pid: 0,
        areaList: [],
        selectedIndex:[0,0,0]
      }
    },
    render(createElement) {
      return createElement('span', {
        on: {
          click: this.showPicker
        }
      }, this.selected.length ? this.selected.join(' ') : '选择省/市/区')
    },
    mounted() {
      this.request(this.api.listArea).then(res => {
        if (res.code == 200) {
          this.areaList = res.data;
          this.areaList.map((province,pkey)=>{
            if(province.value==this.value[0]){
              this.selectedIndex[0]=pkey
              this.selected.push(province.text);
              province.children.map((city,ckey)=>{
                if(city.value==this.value[1]){
                  this.selectedIndex[1]=ckey
                  this.selected.push(city.text);
                  city.children.map((district,dkey)=>{
                    if(district.value==this.value[2]){
                      this.selectedIndex[2]=dkey
                      this.selected.push(district.text);
                    }
                  })
                }
              })
            }
          })
          this.picker = this.$createCascadePicker({
            title: '请选择省市区',
            data: this.areaList,
            selectedIndex: this.selectedIndex,
            onSelect: this.selectHandler,
          })
        } else {
          this.$toast(res.message, 'error');
        }
      })
    },
    methods: {
      showPicker() {
        this.picker.show()
      },
      selectHandler(selectedVal, selectedIndex, selectedTxt) {
        this.selected = selectedTxt
        this.$emit('input', selectedVal)
      }
    }
  }
</script>
