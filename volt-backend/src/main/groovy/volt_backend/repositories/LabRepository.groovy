package volt_backend.repositories

import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import volt_backend.data.Lab

@RepositoryRestResource(collectionResourceRel = "labs", path="labs")
interface LabRepository extends PagingAndSortingRepository<Lab, Long> {
}
