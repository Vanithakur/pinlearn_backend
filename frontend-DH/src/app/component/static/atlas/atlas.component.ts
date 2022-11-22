import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import Viewer from 'viewerjs';

@Component({
    selector: 'app-atlas',
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.css']
})
export class AtlasComponent implements OnInit {

    @ViewChildren("images") images: QueryList<any> | undefined

    windowScrolled:boolean = false;


    constructor() { }

    ngOnInit(): void {
        window.addEventListener('scroll', () => {
            this.windowScrolled = window.pageYOffset > 0;
          });
     }


    ngAfterViewInit(): void { this.preview(); }

   preview() {
        this.images?.forEach((image: any) => {
            const viewer = new Viewer(image?.nativeElement, {
                toolbar: {
                    oneToOne: 4,
                    reset: 4,
                    zoomIn: 4,
                    zoomOut: 4,
                    rotateLeft: 4,
                    rotateRight: 4,
                },
            });
        })
    }

    scrollToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    

}
