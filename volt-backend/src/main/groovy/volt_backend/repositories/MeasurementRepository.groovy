package volt_backend.repositories

import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import volt_backend.data.Lab
import volt_backend.data.Measurement

@RepositoryRestResource(collectionResourceRel = "measurements", path="measurements")
interface MeasurementRepository extends PagingAndSortingRepository<Measurement, Long>  {
}
