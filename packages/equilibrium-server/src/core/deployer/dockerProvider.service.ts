import { Injectable } from '@nestjs/common';
import { DockerProvider } from '@content-branch/equilibrium-deployer/dist/docker';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerProviderService {
  constructor(private readonly docker: DockerService) {}
  getProvider() {
    return new DockerProvider(this.docker);
  }
}
