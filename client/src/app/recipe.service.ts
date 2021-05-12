import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

	private apiurl = environment.apiurl;

  	constructor(private http:HttpClient) { }

	listRecipe() {
		return this.http.get( this.apiurl + '/recipes/');
	}

	create(data) {
		return this.http.post(`${this.apiurl}/recipes`, data);
	}

	read(id) {
		return this.http.get(`${this.apiurl}/recipes/${id}`);
	}

	update(id, data) {
		return this.http.put(`${this.apiurl}/recipes/${id}`, data);
	}

	delete(id) {
		return this.http.delete(`${this.apiurl}/recipes/${id}`);
	}
}
