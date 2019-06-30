const LOCATIONS = "Koramangala,HSR Layout,Indiranagar";
const DATES = "Mon,Tue,Wed,Thu,Fri,Sat,Sun";
const FILTERS = "FUELS:,Petrol,Diesel,CAR TYPE:,Hatchback,Sedan,SUV,Mini SUV,TRANSMISSION:,Manual,Automatic"

const vm = new Vue ({
    el : '#app' ,
    data : {
        initial_results: [],
        results: [],
        gets_filter:[],
        locations: LOCATIONS.split(','),
        location: 'Kormangala',
        dates: DATES.split(','),
        date: '',
        filters: FILTERS.split(','),
        filter: 'Filter By',
        showResults: false,
        presents: [],
        searches: [],
        select: false,
        get_filter: false,
        get_search: false
    },
    mounted() {
        this.getPosts(this.location,this.date);
        this.getFilters(this.filter);
        this.getSearches(this.search);
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
            for(var i=0;i<this.results.length-1;i++)
            {
                for(var j=0;j<this.results.length-i-1;j++)
                {
                    if(this.results[j].price>this.results[j+1].price)
                    {
                        var t=this.results[j];
                        this.results[j]=this.results[j+1];
                        this.results[j+1]=t;
                        var t1=this.presents[j];
                        this.presents[j]=this.presents[j+1];
                        this.presents[j+1]=t1;
                    }
                }
            }
            this.select=true;
        },
        getFilters(filter) {
            this.get_filter=false;
            for(var i=0;i<this.results.length;i++){
                if(this.results[i].fuel_Type === this.filter || this.results[i].car_Type === this.filter || this.results[i].transmission === this.filter)
                {
                    this.gets_filter.push({name:this.results[i].name,photo:this.results[i].photo,location:this.results[i].location,seats:this.results[i].seats,fuel_Type:this.results[i].fuel_Type,transmission:this.results[i].transmission,car_Type:this.results[i].car_Type,price:this.results[i].price,present:this.presents[i]});
                    this.get_filter=true;
                }
            }
        },
        getSearches(search) {
            this.get_search=false;
            for(var i=0;i<this.results.length;i++){
                if(this.results[i].fuel_Type === this.search || this.results[i].car_Type === this.search || this.results[i].transmission === this.search||this.results[i].)
                {
                    this.gets_filter.push({name:this.results[i].name,photo:this.results[i].photo,location:this.results[i].location,seats:this.results[i].seats,fuel_Type:this.results[i].fuel_Type,transmission:this.results[i].transmission,car_Type:this.results[i].car_Type,price:this.results[i].price,present:this.presents[i]});
                    this.get_filter=true;
                }
            }
        }
    }
});
