const LOCATIONS = "Koramangala,HSR Layout,Indiranagar";
const DATES = "Mon,Tue,Wed,Thu,Fri,Sat,Sun";

const vm = new Vue ({
    el : '#app' ,
    data : {
        initial_results: [],
        results: [],
        locations: LOCATIONS.split(','),
        location: 'Kormangala',
        dates: DATES.split(','),
        date: '',
        showResults: false,
        presents: [],
        select: false,
        i: 0
    },
    mounted() {
        this.getPosts(this.location,this.date);
        this.selected(this.i);
    },
    methods: {
        getPosts(location,date) {
            this.showResults = false
            axios.get("https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85")
            .then(response => {this.initial_results = response.data });
            let posts = this.initial_results;
            posts.map(post => {
                if(post.location === this.location){
                    this.results.push({name:post.name,photo:post.photo,price:post.price,location:post.location,seats:post.seats,fuel_Type:post.fuel_Type});
                    this.showResults = true;
                    let avails = post.availability.split(',');
                    let flag=false;
                    for(var i=0;i<avails.length;i++)
                    {
                        if(avails[i]===this.date)
                        {
                            flag=true;
                            break;
                        }
                    }
                    this.presents.push(flag);
                }
            });
        },
        selected(i) {
            this.select=false
            if(presents[i] === true)
            {
                this.select=true
            }
        }
    }
});
