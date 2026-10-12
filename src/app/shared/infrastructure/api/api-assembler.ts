
export interface ApiAssembler<Domain, Resource> {
  toDomain(resource: Resource): Domain;
}
