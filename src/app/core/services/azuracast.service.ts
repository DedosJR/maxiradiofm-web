import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { STREAM_API } from '../constants/apis';
import { NowPlaying } from '../models/now-playing.model';

@Injectable({ providedIn: 'root' })
export class AzuraCastService {
  constructor(private http: HttpClient) {}

  getNowPlaying(): Observable<NowPlaying> {
    return this.http.get<NowPlaying>(STREAM_API);
  }
}
