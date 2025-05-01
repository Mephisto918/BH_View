import API from '../config/api'

class AuthService{
  private baseUrl = API.BASE_URL
  private PORT = API.PORT

  async login(username: string, password: string) {
    // console.log(`${this.baseUrl}${this.PORT}/auth/login`);
    const res = await fetch(`${this.baseUrl}${this.PORT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    // console.log(res);

    if(!res.ok) {
      throw new Error('Login failed')
    }

    const data = await res.json();
    return {
      data: data.data,
      success: data.success,
      status: data.status,
      details: data.details,
      timestamp: data.timestamp,
    }
  }

  isAuthenticated(){
    // JWT shits
  }

  logout (){
    // clear JTW shit
  }

  // registration method there 
  // chatgpt
  /*
     async register(email: string, password: string) {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return response.json();
    }
  */
}

export default AuthService;