package volt_backend.data

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id


@Entity
class Measurement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id

    double frequency
    double magnitude
    double tolerance
}
