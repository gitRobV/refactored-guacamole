import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	newUser: object = {
		email: '',
		password: '',
		confirm_pw: ''
	};
	constructor(private _apiService: ApiService, private _router: Router) { }

	ngOnInit() {
	}

    registerUser(user_info) {
		// Call api Service to Create User
		this._apiService.regNewUser(user_info)
		.then((response) => {
			this._router.navigate(['/profile']);
		})
		.catch((error) => {
			console.log(error)
		});
    }

}
