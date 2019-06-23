const LOCATIONS = "Koramangala,HSR Layout,Indiranagar";
const DATES = "Mon,Tue,Wed,Thu,Fri,Sat,Sun";
const FUELS = "Petrol,Diesel"

const vm = new Vue ({
    el : '#app' ,
    data : {
        initial_results: [],
        results: [],
        fuels_filter:[],
        locations: LOCATIONS.split(','),
        location: 'Kormangala',
        dates: DATES.split(','),
        date: '',
        fuels: FUELS.split(','),
        fuel: '',
        showResults: false,
        presents: [],
        select: false,
        fuel_filter: false,
        i: 0
    },
    mounted() {
        this.getPosts(this.location,this.date);
        this.selected(this.i);
        this.getFilters(this.fuel);
    },
    methods: {
        getPosts(location,date) {
            this.showResults = false
            axios.get("https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85")
            .then(response => {this.initial_results = response.data });
            let posts = this.initial_results;
            posts.map(post => {
                if(post.location === this.location){
                    this.results.push({name:post.name,photo:post.photo,price:post.price,location:post.location,seats:post.seats,fuel_Type:post.fuel_Type,transmission:post.transmission,car_Type:post.car_Type,availability:post.availability,presents:false});
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
        },
        getFilters(fuel) {
            this.fuel_filter=false;
            for(var i=0;i<this.results.length;i++){
                if(this.results[i].fuel_Type === this.fuel)
                {
                    this.fuels_filter.push({name:this.results[i].name,photo:this.results[i].photo,location:this.results[i].location,seats:this.results[i].seats,fuel_Type:this.results[i].fuel_Type,transmission:this.results[i].transmission,car_Type:this.results[i].car_Type,present:this.presents[i]});
                    this.fuel_filter=true;
                }
            }
        }
    }
});
