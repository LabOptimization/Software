package volt_backend.data

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.ManyToOne
import com.fasterxml.jackson.annotation.JsonIgnore

@Entity
class Measurement {

    private int index

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id

    @JsonIgnore
    @ManyToOne(targetEntity = Lab.class)
    private Lab lab;

    String label
    String type

    double value
    double posTolerance
    double negTolerance
}
