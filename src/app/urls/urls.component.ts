import { Component, OnInit } from '@angular/core';

import { URLs } from '../URLs';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css']
})
export class UrlsComponent implements OnInit {

  urls: URLs[];
  urlC:URLs={} as URLs;
  constructor(private UrlService: UrlService) { }

  ngOnInit() {
    this.getURLs();
  }

  getURLs(): void {
    this.UrlService.getURLs()
    .subscribe(urls => {
      this.urls = urls;
     });
  }

  delete(url: URLs): void {
    this.urls = this.urls.filter(h => h !== url);
    this.UrlService.deleteUrl(url).subscribe();
  }

  addUrl(fullurl: string): void {
    fullurl=fullurl.trim();
    this.urlC.fullname=fullurl;
    this.UrlService.addUrl(this.urlC)
    .subscribe((url)=>{
      this.urls.push(url);
    });
    
  }
}
