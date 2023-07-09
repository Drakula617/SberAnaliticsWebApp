//import { linechartVue } from '/js/line_chart.js';
layoutVue = new Vue({
    el: '#layout-div',
    data:
    {
        
    },
    mounted() {
        
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
                    linechartVue.getSbers();
                    linechartVue.getDateBetween();
                });
        }
    }
});