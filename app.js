const vm = new Vue ({
    el : '#app' ,
    data : {
        results: [],
    },
    mounted() {
        axios.get("https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85")
        .then(response => {this.results = response.data })
    }
});