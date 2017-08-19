import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: object = {
		email: '',
		password: ''
	};

	constructor(private _apiService: ApiService, private _router: Router) { }

	ngOnInit() {
	}

    login(user_info) {
		// Call api Service to Create User
		this._apiService.authenticate(this.user)
		.then((response) => {
			this._router.navigate(['/profile']);
		})
		.catch((error) => {
			console.log(error)
		});
    }

}
