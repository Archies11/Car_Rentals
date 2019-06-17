const LOCATIONS = "Koramangala,HSR Layout,Indiranagar";
const DATES = "Mon,Tues,Wednes,Thurs,Fri,Satur,Sun";

const vm = new Vue ({
    el : '#app' ,
    data : {
        initial_results: [],
        results: [],
        locations: LOCATIONS.split(','),
        location: 'Kormangala',
        dates: DATES.split(','),
        date: '',
        showResults: false
    },
    mounted() {
        this.getPosts(this.location);
    },
    methods: {
        getPosts(location) {
            this.showResults = false
            axios.get("https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85")
            .then(response => {this.initial_results = response.data });
            let posts = this.initial_results;
            posts.map(post => {
                if(post.location === this.location){
                    this.results.push({name:post.name,photo:post.photo,price:post.price,location:post.location,seats:post.seats,fuel_type:post.fuel_type});
                    this.showResults = true;}
            });
        } 
    }
});
