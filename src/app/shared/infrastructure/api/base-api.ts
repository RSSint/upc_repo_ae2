import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiAssembler } from './api-assembler';


export abstract class BaseApi<Domain, Resource, CreateResource = Resource> {
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly endpoint: string,
    private readonly assembler: ApiAssembler<Domain, Resource>,
  ) {}

  protected getAll(params?: HttpParams): Observable<Domain[]> {
    const options = params ? { params } : {};
    return this.http.get<Resource[]>(this.endpoint, options).pipe(
      map((resources) => resources.map((resource) => this.assembler.toDomain(resource))),
    );
  }

  protected getResource(params?: HttpParams): Observable<Domain> {
    const options = params ? { params } : {};
    return this.http.get<Resource>(this.endpoint, options).pipe(
      map((resource) => this.assembler.toDomain(resource)),
    );
  }

  protected postResource(resource: CreateResource): Observable<Domain> {
    return this.http.post<Resource>(this.endpoint, resource).pipe(
      map((response) => this.assembler.toDomain(response)),
    );
  }
}
