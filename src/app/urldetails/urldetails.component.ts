import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CanvasJS from '../canvasjs/canvasjs.min.js';
import { Location } from '@angular/common';


import { URLs } from '../URLs';
import { HitRecord } from '../HitRecord';
import { UrlService } from '../url.service';


@Component({
  selector: 'app-urldetails',
  templateUrl: './urldetails.component.html',
  styleUrls: ['./urldetails.component.css']
})
export class UrldetailsComponent implements OnInit {

  urlB: URLs={}as URLs;
  title="ShortUrl";
  fullname="Original Url";
  totalclick:number={}as number;
  datecreated=new Date();
  hitrecords:HitRecord[];
  fullData: Map<string, number>={} as Map<string, number>;
  test: Date;
// now you can use it
  constructor(
    private location: Location,
    private UrlService: UrlService,
    private route: ActivatedRoute
    ) { }

    ngOnInit() {
      this.getRecords();
    }
  
    getRecords(): void {
     this.urlB.id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.UrlService.getRecords(this.urlB)
      .subscribe(hitrecords => {
        this.hitrecords = hitrecords;
        this.title=hitrecords[0].urlShort;
        this.datecreated=hitrecords[0].dateCreated;
        this.fullname=hitrecords[0].urlFull;
        if(this.hitrecords[0].browser)
        {
          this.dispChart();
          this.totalclick=hitrecords.length;
        }
        else{
          this.totalclick=0;
        }
       });
    }
    goBack(): void {
      this.location.back();
    }
  
    dispChart()
  {
    this.sortAllData();
    let charta = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Hit Timeline"
      },
      data: [{
        indexLabelFontColor: "darkSlateGray",
        name: "views",
        type: "area",
        yValueFormatString: "#,##0 Hits",
        dataPoints: [
          { y: this.fullData["1"], label: "January" },
          { y: this.fullData["2"], label: "February" },
          { y: this.fullData["3"], label: "March" },
          { y: this.fullData["4"], label: "April" },
          { y: this.fullData["5"], label: "May" },
          { y: this.fullData["6"], label: "June" },
          { y: this.fullData["7"], label: "July" },
          { y: this.fullData["8"], label: "August"},
          { y: this.fullData["9"], label: "September" },
          { y: this.fullData["10"], label: "October" },
          { y: this.fullData["11"], label: "November" },
          { y: this.fullData["12"], label: "December" }
        ]
      }]
    }); 
    var chartb = new CanvasJS.Chart("chartContainerB", {
      animationEnabled: true,
      title: {
        text: "Browser Hit Data"
      },
      data: [{
        type: "pie",
      startAngle: 240,
      yValueFormatString: "##0.00\"%\"",
      indexLabel: "{label} {y}",
      dataPoints: [
        {y: this.fullData["Firefox"], label: "Firefox"},
        {y: this.fullData["Chrome"], label: "Chrome"},
        {y: this.fullData["IE"], label: "IE"},
        {y: this.fullData["Safari"], label: "Safari"}
        ]
      }]
    });
    var chartc = new CanvasJS.Chart("chartContainerC", {
      animationEnabled: true,
      
      title:{
        text:"Operating System Hit Data"
      },
      axisX:{
        interval: 1
      },
      axisY2:{
        interlacedColor: "rgba(1,77,101,.2)",
        gridColor: "rgba(1,77,101,.1)",
        title: "Number of Hits"
      },
      data: [{
        type: "bar",
        name: "companies",
        axisYType: "secondary",
        color: "#014D65",
        dataPoints: [
          { y: this.fullData["Windows"], label: "Windows" },
          { y: this.fullData["Macintosh"], label: "Macintosh" },
          { y: this.fullData["Android"], label: "Android" },
          { y: this.fullData["IOS"], label: "IOS" },
          { y: this.fullData["Linux"], label: "Linux" }
        ]
      }]
    });
    charta.render();
    chartb.render();
    chartc.render();
  }
  
  initializeSort()
  {
    this.fullData["Chrome"]=<number>0;
    this.fullData["Firefox"]=<number>0;
    this.fullData["IE"]=<number>0;
    this.fullData["Safari"]=<number>0;
  
    this.fullData["Windows"]=<number>0;
    this.fullData["Linux"]=<number>0;
    this.fullData["IOS"]=<number>0;
    this.fullData["Macintosh"]=<number>0;
    this.fullData["Android"]=<number>0;
  
    this.fullData["1"]=<number>0;
    this.fullData["2"]=<number>0;
    this.fullData["3"]=<number>0;
    this.fullData["4"]=<number>0;
    this.fullData["5"]=<number>0;
    this.fullData["6"]=<number>0;
    this.fullData["7"]=<number>0;
    this.fullData["8"]=<number>0;
    this.fullData["9"]=<number>0;
    this.fullData["10"]=<number>0;
    this.fullData["11"]=<number>0;
    this.fullData["12"]=<number>0;
  }
  
  
  sortAllData()
  {
    this.initializeSort();
   this.hitrecords.forEach((item,indexI)=>
   {
      this.fullData[item.browser]=<number>this.fullData[item.browser]+1;
      this.fullData[item.opSys]=<number>this.fullData[item.opSys]+1;
      this.test = new Date(item.date);
      console.log(this.test.getMonth());
      var month=(this.test.getMonth()+1).toString();
      this.fullData[month]=<number>this.fullData[month]+1;
      
   });
   this.fullData["Chrome"]=((this.fullData["Chrome"])/this.hitrecords.length)*100;
   this.fullData["Firefox"]=((this.fullData["Firefox"])/this.hitrecords.length)*100;
   this.fullData["IE"]=((this.fullData["IE"])/this.hitrecords.length)*100;
   this.fullData["Safari"]=((this.fullData["Safari"])/this.hitrecords.length)*100;
  }
  }
  