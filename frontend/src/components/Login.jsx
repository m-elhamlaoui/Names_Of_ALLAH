import React from 'react';


const Login = () => {
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form>
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" /> Remember Me <a href="#">Forget Password</a>
              </label>
            </div>
            <button type="submit">Log in</button>
            <div className="register">
              <p>
                Don't have an account <a href="register">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
