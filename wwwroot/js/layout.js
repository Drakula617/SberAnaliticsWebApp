//import { linechartVue } from '/js/line_chart.js';
layoutVue = new Vue({
    el: '#layout-div',
    data:
    {
        datebetween: {}
    },
    mounted() {
        const menu_btn = document.getElementById('menu-btn');
        menu_btn.addEventListener('click', this.open_close_menu);
        const import_excel_but = document.getElementById('import-excel-but');
        import_excel_but.addEventListener('click', this.importExcel);

    },
    methods: {
        importExcel: function () {
            const fileInput = document.getElementById('excel-file');
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', file);
            axios.post('/Home/ImportAndGetSbers', formData).
                then((response) => {
                    this.getDateBetween();
                    linechartVue.getSbers();
                    
                });
        },
        getDateBetween: function () {
            axios.post('/Home/GetDateBetween').then((response) => {
                this.datebetween = response.data;
            });
        },
        open_close_menu: function ()
        {
            const menu = document.getElementById('menu');
            if (menu.style.transform === "translateX(-100%)")
            {
                menu.style.transform = "translateX(0%)";
            }
            else
            {
                menu.style.transform = "translateX(-100%)";
            }
        }
    }
});