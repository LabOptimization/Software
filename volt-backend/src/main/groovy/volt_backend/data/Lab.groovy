package volt_backend.data

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotNull
import javax.persistence.OneToMany
import javax.persistence.OrderColumn
import com.fasterxml.jackson.annotation.JsonIgnore

@Entity
class Lab {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id

    @NotNull
    String name

    String description

    // store all steps as json
    String steps
    
    // or store them all as separate entries
    @OrderColumn(name="id")
    @OneToMany(mappedBy = "lab")
    private Set <Measurement>  measurements = new HashSet<>();


}
