
const loginfield = {
    email:"pruebalogin@gmail.com",
    password: 123
}

const login = async (email, password ) =>{   
    try { 
        if( !email == "" && ! password == "" ){
            if( loginfield.email == email && loginfield.password == password){
                return true
            }
            return false
        }
        
    } catch (error) {
        return { error: error.message };
    }
} 
module.exports = login 