import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    user: object;
    title = 'Welcome To Mean Black Belt';

    constructor(private _apiService: ApiService, private _router: Router) { }

	ngOnInit() {
		this._apiService.checkAuth()
		.then((response) => {
			console.log(response)
			this.user = response.data;
		})
		.catch((error) => {
			console.log(error)
		});
	}
}
