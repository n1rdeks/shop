import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styles: [
  ]
})
export class ServerErrorComponent implements OnInit {
    error: any;

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        // this defence on equal just error. Need confirm on Error object have included state.
        this.error = navigation && navigation.extras && navigation.extras.state &&
            navigation.extras.state.error;
    }

    ngOnInit(): void {
    }

}
