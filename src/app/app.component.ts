import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmexioTabComponent } from 'amexio-ng-extensions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  currentDate: any;
  convertfromdate: any;
  converttodate: any;
  monthWiseDataarray: any;
  yearWiseDataarray: any;
  currentyearchart: any;
  lineChartData: any;
  lineChartData1: any;
  WeekChart: any;
  QuarterChart: any;
  fromdate: any;
  todate: any;
  packagename: any;
  packagename1: any;
  showgrid1: boolean;
  showgrid2: boolean;
  downloadDataArray: any[] = [];
  obj = {};
  other = [];
  array: any = [];
  totaldownloadcount:any;
  downloads = [];
  yeardatapoint: any
  monthdatapoint: any;
  giturl: any;
  npmurl: any;
  homepageurl: any;
  quarterdata: any;
  disabledDate: any[];
  errorMessage: any = [];
  dependencies: any[] = [];
  devdependencies: any = [];
  dependencyarray: any = [];
  releasearray: any = [];
  KeyWords: any = [];
  devdependency: any[] = [];
  showChart: boolean;
  showMonthChart: boolean;
  showYearChart: boolean;
  isLoading: boolean = false;
  showflag: boolean;
  package: string;
  sum: number = 0;
  currentyearsum: number = 0;
  currentmonthsum: number = 0;
  isLoading1: boolean;
  dashboardActiveTab: boolean;
  packagesearchtab: boolean;
  generalinfotab: boolean;
  dependencytab: boolean;
  perdaydownload: any;
  groupedByWeek = [];
  currentWeek = [];
  range: any;
  monthrange: any;
  totalDays: any;
  data: any;
  packageModel: PackageModel;
  yearwiseModel: YearWiseDownload;
  monthwisedata: any;
  monthsum1: any;
  yearsum: any;
  weeksum: any;
  dropdowndata: any[]=[];
  dropdownArray=[];
  quarter1download: number = 0;
  quarter2download: number = 0;
  quarter3download: number = 0;
  quarter4download: number = 0;
  currentmonthrelease: number = 0;
  lastthreemonthrelease: number = 0;
  lastsixmonthrelease: number = 0;
  lastyearrelease: number = 0;
  completerelease: number = 0;
  Redme: any;
  html: any;
  urls: string;
  stringArray: any;
  apicall: any;
  fromDate:any;
  toDate:any;
  Year:any;
  week:any;
  YearKey:any;
 totalcount:any[]=[];
 jandate:any;
  constructor(private http: HttpClient) {
    this.packageModel = new PackageModel();
    this.packageModel.packageName = "amexio-ng-extensions";
    this.packageModel.fromDate = new Date("1/06/2017");
    this.packageModel.toDate = new Date();
    this.stringArray = ["ie_/_edge\">", "firefox\">", "chrome\">", "safari\">", "opera\">", "ios_safari\">", "chrome_for_android\">"]; 
  }

  ngOnInit() {
    this.getData();
    this.getDataPoint2();
    this.getDataPoint3();
    this.formDropdownData();
   // this.getTotal();
  }
  //search button click method
  searchData(amexioTab: AmexioTabComponent) {
    amexioTab.setActiveTab(1);
    this.getData();
    this.getDataPoint2();
    this.getDataPoint3();
   // this.getTotal();
  }
//form year dropdown data
  formDropdownData()
  {
    let minYear = 2000;
    let maxyear = new Date().getFullYear();

    for (let i =maxyear; i>= minYear;i--) {
      this.dropdowndata.push({ 'year': i + '' });
    }
  }
  
  //THIS METHOD IS USED FOR GET THE DATA FROM SERVICE AND CREATE CHART JSON 
  getData() {
    this.dashboardActiveTab = false;
    this.packagesearchtab = false;
    this.generalinfotab = false;
    this.dependencytab = false;
    this.sum = 0;
    this.yearsum = 0;
    this.monthsum1 = 0;
    this.weeksum = 0;
    this.totaldownloadcount=0
    this.currentyearsum = 0;
    this.currentmonthsum = 0;
    this.showChart = false;
    this.showgrid1 = false;
    this.showgrid2 = false;
    this.showMonthChart = false;
    this.showYearChart = false;
    this.isLoading = true;
    this.isLoading1 = true;
    this.errorMessage = [];
    this.lineChartData = [];
    this.monthWiseDataarray = [];
    this.yearWiseDataarray = [];
    this.currentyearchart = [];
    this.WeekChart = [];
    this.monthwisedata = [];
    this.QuarterChart = [];
    this.dependencyarray = [];
    this.devdependency = [];
    this.releasearray = [];
    let inputUrl: any;
    this.quarter1download = 0;
    this.quarter2download = 0;
    this.quarter3download = 0;
    this.quarter4download = 0;


    this.validatePackageName();
    this.convertFromDate(this.packageModel.fromDate);
    this.convertToDate(this.packageModel.toDate);
    let year= this.packageModel.fromDate.getFullYear();
    // let string= '1' + '/' + '01' + '/' + year;
    // this.jandate=new Date(string);
    this.packagename1 = this.packageModel.packageName;
    inputUrl = this.convertfromdate + ':' + this.converttodate + '/' + this.packageModel.packageName
    this.perdaydownload = this.packageModel.packageName + ' ' + ':' + ' ' + this.convertfromdate + ' ' + 'to' + ' ' + this.converttodate
    this.range = this.convertfromdate + ' ' + 'to' + ' ' + this.converttodate;
    let response: any;
    this.http.get('https://api.npmjs.org/downloads/range/' + inputUrl, {}).subscribe(
      resp => {
        response = resp;
        this.showChart = true;
        },
      error => {
       
        this.showChart = false;
        if (JSON.stringify(error.error.error) == '"end date > start date"') {
          this.errorMessage.push("To-Date should be greater than From-Date")
        } else if (JSON.stringify(error.error.error) == '"invalid date"') {
          this.errorMessage.push("Enter Valid Date");
        } else {
          this.errorMessage.push(JSON.stringify(error.error.error));
        }
        this.isLoading = false;
        this.isLoading1 = false;
      },
      () => {

        this.fromDate=this.packageModel.fromDate;
        this.toDate=this.packageModel.toDate;
        this.Year=this.packageModel.year;
        
        this.dashboardActiveTab = true;
        let downloadDataArray1 = response.downloads;

        this.sum = 0;
        let years:any;
        this.getRedme(this.packagename1);
        this.getDependencies(this.packagename1);
       

     this.lineChartData.push([
          { "datatype": "string", "label": 'Date' },
          { "datatype": "number", "label": 'Downloads Per Day' }
        ]);

        this.monthWiseDataarray.push([
          { "datatype": "string", "label": 'Months' },
          { "datatype": "number", "label": 'Downloads Per Month' }
        ]);

        this.yearWiseDataarray.push([
          { "datatype": "string", "label": 'Years' },
          { "datatype": "number", "label": 'Downloads Per Year' }
        ]);

     response.downloads.forEach((downLoadObj: any) => {
          let dayWiseDownloadCount: any = new DayWiseDownloadCount(downLoadObj.day, downLoadObj.downloads);
          this.lineChartData.push(dayWiseDownloadCount.add());
        });

          let monthwisedata: MonthWiseDownload;
          monthwisedata = new MonthWiseDownload();
          response.downloads.forEach((objects: any) => {
          monthwisedata.groupMonth(objects.day, objects.downloads);

        });

       for (const key in monthwisedata.monthwise) {
          if (monthwisedata.monthwise.hasOwnProperty(key)) {
            const element = monthwisedata.monthwise[key];
            let obj = [];
            obj.push(key);
            obj.push(element);
            this.monthWiseDataarray.push(obj);

          }
        }

        let yearwisedata: YearWiseDownload;
        yearwisedata = new YearWiseDownload();
        response.downloads.forEach((objects: any) => {
          yearwisedata.groupYear(objects.day, objects.downloads);
        });

        for (const key in yearwisedata.yearWise) {
          if (yearwisedata.yearWise.hasOwnProperty(key)) {
            const element = yearwisedata.yearWise[key];
            let year = [];
            year.push(key);
            year.push(element);
            this.yearWiseDataarray.push(year);
          }
        }
        this.getWeekData(downloadDataArray1);
         this.YearKey=[];

         response.downloads.forEach((objects: any) => {
            years = this.getYears(objects.day); 
             if(this.YearKey.includes(years))
             {
               return this.YearKey;
             } 
             else{
                    this.YearKey.push(years);
             }
        });
         
            this.getTotal();
    }
    );

  }
  getRedme(data: any):
    any {

    this.apicall = 'https://api.npms.io/v2/package/' + data;
    let redmeResponse: any;
    this.http.get('https://api.npms.io/v2/package/' + data)
      .subscribe(
        response => {
          redmeResponse = response

        },
        (err: any) => {
          console.log("Unable to connect");
        },
        () => {

          this.urls = "godban.github.io/";
          this.Redme = redmeResponse.collected.metadata.readme;
          let showdown = require('showdown'),
            converter = new showdown.Converter();
          showdown.setOption('simplifiedAutoLink', true);
          converter.setFlavor('github');
          this.html = converter.makeHtml(this.Redme);
          for (let i = 0; i < this.urls.length; i++) {
            if (this.html.match("godban.github.io/")) {
              this.html = this.html.replace("godban.github.io/", "");
              this.html = this.html.replace("](http://browsers-support-badges/)", "");
            }
          }

          for (let j = 0; j < this.stringArray.length; j++) {
            if (this.html.match(this.stringArray[j])) {
              this.html = this.html.replace(this.stringArray[j], "");

            }
          }
        });
 }

  getDependencies(griddata: any):
    any {
    this.dependencyarray = [];
    this.devdependency = [];


    let redmeResponse: any;
    this.http.get('https://api.npms.io/v2/package/' + griddata)
      .subscribe(
        response => {
          redmeResponse = response
        },
        (err: any) => {
          console.log("Unable to connect");
        },
        () => {
          this.devdependencies = redmeResponse.collected.metadata.devDependencies;
          this.dependencies = redmeResponse.collected.metadata.dependencies;

          let arrayOfdevKeys = Object.keys(this.devdependencies);
          let arrayOfdevValues = Object.values(this.devdependencies);

          if (this.devdependencies != null) {
            for (let i = 0; i < arrayOfdevKeys.length; i++) {
              let devobj = {};
              devobj['depkey'] = arrayOfdevKeys[i];
              devobj['depvalue'] = arrayOfdevValues[i];
              this.devdependency.push(devobj);
            }

          }

          let arrayOfdepKeys = Object.keys(this.dependencies);
          let arrayOfdepValues = Object.values(this.dependencies);
          if (this.dependencies != null) {
            for (let i = 0; i < arrayOfdepKeys.length; i++) {
              let depobj = {};
              depobj['depkey'] = arrayOfdepKeys[i];
              depobj['depvalue'] = arrayOfdepValues[i];
              this.dependencyarray.push(depobj);

            }

          }
        }
      );

  }
  //Setting by default Packagename
  validatePackageName() {
    if (this.packageModel.packageName == null || this.packageModel.packageName === '') {
      this.packageModel.packageName = "amexio-ng-extensions"
    }

  }

  validateDropdownYear() {
    if (this.packageModel.year == null || this.packageModel.year === '') {
      this.packageModel.year = new Date().getFullYear();
    }
  }

  onLinkClick(link: string) {
    window.open(link, '_blank');
  }

  convertFromDate(str: any) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.convertfromdate = [date.getFullYear(), mnth, day].join("-");
  }

  convertToDate(str: any) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.converttodate = [date.getFullYear(), mnth, day].join("-");

  }
  // Method contains logic to display QuarterChart
  getQuarterChart(downloadDataArray1) {

    this.QuarterChart = [];
    let currentyear = 0;
    currentyear = this.packageModel.year;
    let currentquarter: any;
    let year = this.packageModel.year;
    let fromdate1 = year + '-' + '01' + '-' + '01';
    let todate1 = year + '-' + '12' + '-' + '31';
    let url = fromdate1 + ':' + todate1 + '/' + this.packageModel.packageName
    let response: any;
  
    downloadDataArray1.forEach((quarter: any) => {
      currentquarter = this.getQuarter(quarter.day);
      if (quarter.day.includes(currentyear) && currentquarter == 1) {
        this.quarter1download = this.quarter1download + quarter.downloads;
      }
      else if (quarter.day.includes(currentyear) && currentquarter == 2) {
        this.quarter2download = this.quarter2download + quarter.downloads;
      }
      else if (quarter.day.includes(currentyear) && currentquarter == 3) {
        this.quarter3download = this.quarter3download + quarter.downloads;
      }
      else if (quarter.day.includes(currentyear) && currentquarter == 4) {
        this.quarter4download = this.quarter4download + quarter.downloads;
      }
    });

    this.QuarterChart.push(
          [
            { "datatype": "string", "label": 'Quarter' },
            { "datatype": "number", "label": 'Downloads Per Quarter' }
          ],
          ['Q1', this.quarter1download],
          ['Q2', this.quarter2download],
          ['Q3', this.quarter3download],
          ['Q4', this.quarter4download],
        );
     
  }

  //Getting quarter of that date
  getQuarter(date: any) {
    let q = [1, 2, 3, 4];
    let d = new Date(date);
    let currentmonth = d.getMonth();
    return q[Math.floor(currentmonth / 3)];
  }

  //Method contains logic to display weekchart
  getWeekData(data: any) {

    this.groupedByWeek = data.reduce((m, o) => {
      let monday = this.getMonday(new Date(o.day));
      let mondayYMD = monday.toISOString().slice(0, 10);
      let found = m.find(e => e.day === mondayYMD);
      if (found) {
        found.downloads = found.downloads + o.downloads;
      } else {
        o.day = mondayYMD;
        m.push(o);
      }
      return m;
    }, []);
    let Weekwisecount: any;
    let weekData = [];
    this.WeekChart.push([
      { "datatype": "string", "label": 'Weeks' },
      { "datatype": "number", "label": 'Downloads Per Week' }
    ]);   
    this.groupedByWeek.forEach((week: any) => {
      Weekwisecount = new DayWiseDownloadCount(week.day, week.downloads);

      let currentWeekNumber = this.getWeek(new Date(week.day));
      this.WeekChart.push([currentWeekNumber, week.downloads]);
    }) 
            let weekcount=this.WeekChart.length-1;
            this.weeksum=this.WeekChart[weekcount][1];
            this.week=this.WeekChart[weekcount][0];          
  }

  getMonday(d) {
    let day = d.getDay();
    let diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  getWeek(date) {
    let onejan: any;
    let today: any;
    let dayOfYear: any;
    onejan = new Date(date.getFullYear(), 0, 1);
    today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    dayOfYear = ((today - onejan + 86400000) / 86400000);

    let returnweek = Math.ceil(dayOfYear / 7);
    return 'W' + returnweek + '-' + date.getFullYear();  
  }

  getCurrentWeekDatapoint(data: any) {
    this.currentWeek = data.reduce((m, o) => {
      let monday = this.getMonday(new Date(o.day));
      let mondayYMD = monday.toISOString().slice(0, 10);
      let found = m.find(e => e.day === mondayYMD);
      if (found) {
        found.downloads = found.downloads + o.downloads;
      } else {
        o.day = mondayYMD;
        m.push(o);
      }
      return m;
    }, []);
  }

  //To Display Datapoint for total,current month,current year,current week
  getDataPoint3() {

    let date1 = this.packageModel.toDate;
    let mnth = ("0" + (date1.getMonth() + 1)).slice(-2);
    let day = ("0" + date1.getDate()).slice(-2);
    let year = date1.getFullYear();
    let fromdate2 = year + '-' + mnth + '-' + '01';
    let todate2 = year + '-' + mnth + '-' + day;
    let url = fromdate2 + ':' + todate2 + '/' + this.packageModel.packageName
    let monthresponse: any
    this.http.get('https://api.npmjs.org/downloads/range/' + url, {}).subscribe(
      resp => {
        monthresponse = resp;
        this.showChart = true;

      },
      () => {

      },
      () => {
          this.sum = 0;
          this.getAggregate(monthresponse.downloads);
          this.monthsum1 = this.sum;
      });
  }

  getDataPoint2() {
    this.QuarterChart=[];    
    let year = this.packageModel.year;
    let fromdate1 = year + '-' + '01' + '-' + '01';
    let todate1 = year + '-' + '12' + '-' + '31';
    let url = fromdate1 + ':' + todate1 + '/' + this.packageModel.packageName
    let yearresponse: any
    this.http.get('https://api.npmjs.org/downloads/range/' + url, {}).subscribe(
      resp => {
        yearresponse = resp;
        this.showChart = true;
      },
      () => {


      },
      () => {
       
        this.sum = 0;
        this.quarterdata =yearresponse.downloads;
        this.getAggregate(yearresponse.downloads)
        this.yearsum = this.sum;
        this.getQuarterChart(yearresponse.downloads);         
    });
  }
  //to aggregate current year,current month data
  getAggregate(data: any) {
    data.forEach((downLoadObj: any) => {
      let totaldownload: any = downLoadObj.downloads;
      this.sum = this.sum + totaldownload;
    });
  }


  getYears(day: string) {
    const date = new Date(day);
    return [date.getFullYear()].join("-");
  }

//to calculate total downloads formdate  to todate
  getTotal() {

                 this.totaldownloadcount=0;
                 let yearcount=0
                 let url:string;
     
                let fromdate = this.packageModel.fromDate;
                let todate=this.packageModel.toDate;

                 //for fromdate
                let formmnth = ("0" + (fromdate.getMonth() + 1)).slice(-2);
                let formday = ("0" + fromdate.getDate()).slice(-2);
                let formyear = fromdate.getFullYear();
                 //for todate
                 let tomnth = ("0" + (todate.getMonth() + 1)).slice(-2);
                 let today = ("0" + todate.getDate()).slice(-2);
                 let toyear = todate.getFullYear();

      this.YearKey.forEach(year => {
        if(this.YearKey.length>1 && year==fromdate.getFullYear())
        {                
          let formmnth = ("0" + (fromdate.getMonth() + 1)).slice(-2);
          let formday = ("0" + fromdate.getDate()).slice(-2);
          let formyear = fromdate.getFullYear();   
          let fromdate1 = formyear + '-' + formmnth + '-' + formday;               
          let todate1 = year + '-' + '12' + '-' + '31';
           url = fromdate1 + ':' + todate1 + '/' + this.packageModel.packageName;
        }
        else{

          if(this.YearKey.length>1 && year!=fromdate.getFullYear() && year!=todate.getFullYear()){
              let fromdate1 = year + '-' + '01' + '-' + '01';
              let todate1 = year + '-' + '12' + '-' + '31';
               url = fromdate1 + ':' + todate1 + '/' + this.packageModel.packageName;  
          }
       }
       if(this.YearKey.length>1 && year==todate.getFullYear())
       {
            let fromdate1 = year + '-' + '01' + '-' + '01';
            let todate1 = toyear + '-' + tomnth + '-' + today;
             url = fromdate1 + ':' + todate1 + '/' + this.packageModel.packageName;  
        }
        if(this.YearKey.length==1)
        {
            let fromdate1 = formyear + '-' + formmnth + '-' + formday;
            let todate1 = toyear + '-' + tomnth + '-' + today;
            url = fromdate1 + ':' + todate1 + '/' + this.packageModel.packageName                             
      }
        let yearresponse: any
        this.http.get('https://api.npmjs.org/downloads/range/' + url, {}).subscribe(
          resp => {
            yearresponse = resp;
            this.showChart = true;
          },
          () => {
    
          },
          () => {
          
            if(yearresponse){
              this.sum = 0;
              this.getAggregate(yearresponse.downloads);
              if(this.YearKey.length>1)
              {
                     let yeartotal=this.sum;
                     yearcount=yearcount+yeartotal;
                     if(year==todate.getFullYear()){
                      this.totaldownloadcount= yearcount;
                     }
                    
              }
              else{
                      
                      this.totaldownloadcount=this.sum;
                  }
              }   
        });
     });
    
  }
 
}

export class PackageModel {
  fromDate: any ;
  toDate: any ;
  packageName: any ;
  year: any;
  
  constructor(){
  this.fromDate= '';
  this.toDate = '';
  this.packageName= '';
  this.year = new Date().getFullYear()+'';
  }
}

export class TotalDays {
  day: string;
  constructor(day: string) {
    this.day = day;
  }
}

export class DayWiseDownloadCount {
  downloads: string;
  day: number;
  total = 0;

  constructor(day: number, downloads: string) {
    this.day = day;
    this.downloads = downloads;
  }

  add(): any[] {

    return [
      this.day,
      this.downloads
    ];
  }
}
//To display Per Month chart
export class MonthWiseDownload {

  monthwise: number[];
  constructor() {
    this.monthwise = [];

  }
  //method to get monthyear
  getMonthYear(day: string) {
    const date = new Date(day);
    const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    return [date.getFullYear(), mnth].join("-");
  }

  groupMonth(key: string, count: number): any {
   
    const monthkey = this.getMonthYear(key);

    if (this.monthwise[monthkey + ""] != undefined) {
      let currentcount = this.monthwise[monthkey + ""];
      currentcount = currentcount + count;
      this.monthwise[monthkey + ""] = currentcount;
    } else {
      this.monthwise[monthkey + ""] = count;
    }
    return this.monthwise;
  }
}
//To Display Per Year Chart
export class YearWiseDownload {

  yearWise: number[];
  yearkey:any;
  constructor() {
    this.yearWise = [];
   

  }
  //Method to get fullyear
  getYear(day: string) {
    const date = new Date(day);
    return [date.getFullYear()].join("-");
  }

  groupYear(key: string, count: number): any {
    
    const monthkey = this.getYear(key);
  
   
    if (this.yearWise[monthkey + ""] != undefined) {
      let currentcount = this.yearWise[monthkey + ""];
      currentcount = currentcount + count;
      this.yearWise[monthkey + ""] = currentcount;
    } else {
      this.yearWise[monthkey + ""] = count;
    }
    return this.yearWise;
  }
}

