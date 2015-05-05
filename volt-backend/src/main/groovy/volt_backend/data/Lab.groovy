package volt_backend.data

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotNull

@Entity
class Lab {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id

    @NotNull
    String name

    String description
}
