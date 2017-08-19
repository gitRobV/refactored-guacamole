import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    allUsers: object[];
	user = {
		_id: null,
		email: ''
	};
	constructor(private _apiService: ApiService, private _router: Router) { }

	ngOnInit() {
        this._apiService.getCurrentUser()
		.then((response) => {
            if (response.status) {
                this.user = response.data;
                this.allUsers = response.users;
            } else {
                this._router.navigate(['/']);
            }
		})
		.catch((error) => {
			console.log(error)
		});
	}

	logout() {
		this._apiService.logout()
		.then((response) => {
            this._router.navigate(['/login']);
		})
		.catch((error) => {
			console.log(error)
		});
	}

}
