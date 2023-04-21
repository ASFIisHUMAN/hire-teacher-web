const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set up cookie-parser middleware to handle cookies
app.use(cookieParser());

// Array to store registered users
const users = [];

// Serve the home page
app.get('/', (req, res) => {
  const loggedIn = req.cookies.loggedIn === 'true';
  const profileLink = loggedIn ? `<li class="nav-item"><a class="nav-link" href="/profile">Profile</a></li>` : '';
  const logoutLink = loggedIn ? `<li class="nav-item"><a class="nav-link" href="/logout">Log Out</a></li>` : '';
  const registerLink = loggedIn ? '' : `<li class="nav-item"><a class="nav-link" href="/register">Register</a></li>`;
  
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"><img src="logo.png" alt="Logo"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Help & Support</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact Us</a>
          </li>
          ${profileLink}
          ${logoutLink}
          ${registerLink}
        </ul>
      </div>
    </nav>
  `;
  
  const homePage = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZEb6UksdQRVvoxMfooCJN6" crossorigin="anonymous">
      </head>
      <body>
        ${navbar}
        <div class="container mt-5">
          <h1>Welcome to our website!</h1>
          <p>Thanks for visiting. Please explore our site to learn more about what we have to offer.</p>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-OgoumWswifh3pO3E1zDKtnIvymDwGZDR0RbQTusk&Me8BQ5GK6LrVuYz850G6f5Q" crossorigin="anonymous"></script>
        </body>
      </html>
    `;
    
    res.send(homePage);
  });
  
  // Serve the registration page
  app.get('/register', (req, res) => {
    const registrationForm = `
    <!DOCTYPE html>
    <html>
    <head>
      <!-- Include Bootstrap CSS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    
      <!-- Set the viewport for responsiveness -->
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    <body>
    <div class="container mt-5">
      <h1>Teacher's Registration Form</h1>
      <p>Please fill the form</p> <!-- Updated: Added text -->
      <form id="teacherForm" action="/register" method="post">
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" class="form-control" id="image" accept="image/*">
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" class="form-control" id="name" placeholder="Enter your name">
        </div>
        <div class="form-group">
          <label for="gender">Gender:</label>
          <select class="form-control" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="signupPhoneNumber">Phone Number</label>
          <input type="tel" class="form-control" id="signupPhoneNumber" pattern="[0-9]{11}" maxlength="11" 
              placeholder="Enter phone number" title="Phone number must be 11 digits and start with '01'" required> 
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" placeholder="Enter your email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="runningEducation">Running Education:</label>
          <input type="text" class="form-control" id="runningEducation" placeholder="Enter your running education">
        </div>
        <div class="form-group">
          <label for="completedEducation">Completed Education:</label>
          <input type="text" class="form-control" id="completedEducation" placeholder="Enter your completed education">
        </div>
        <div class="form-group">
          <label for="interestToTeach">Interest to Teach:</label>
          <input type="text" class="form-control" id="interestToTeach" placeholder="Enter your interest to teach">
        </div>
        <div class="form-group">
          <label for="division">Division:</label>
          <select class="form-control" id="division">
            <option value="">-- Select Division (optional) --</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Barishal">Barishal</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Khulna">Khulna</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Mymensingh">Mymensingh</option>
          </select>
        </div>
        <div class="form-group" id="districtGroup" style="display:none;">
          <label for        ="district">District:</label>
          <select class="form-control" id="district">
            <option value="">-- Select District --</option>
          </select>
        </div>
        <button type="submit"id="submit-form" class="btn btn-primary">Submit</button>
      </form>
    </div><li><ul>asfii</ul></li>
    
    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
    
    <script>
    // Show/hide district dropdown based on selected division
    $("#division").on("change", function() {
      var selectedDivision = $(this).val();
      if (selectedDivision === "Dhaka") {
        $("#districtGroup").show();
      }else if(selectedDivision === "Barishal"){
        $("#districtGroup").show();
    }else if(selectedDivision === "Sylhet"){
      $("#districtGroup").show();
    }else if(selectedDivision === "Khulna"){
      $("#districtGroup").show();
    }else if(selectedDivision === "Chattogram"){
      $("#districtGroup").show();
    }else if(selectedDivision === "Rajshahi"){
      $("#districtGroup").show();
    }else if(selectedDivision === "Rangpur"){
      $("#districtGroup").show();
    }else if(selectedDivision === "Mymensingh"){
      $("#districtGroup").show();
    } else {
        $("#districtGroup").hide();
      }
    });
    
    // Populate district dropdown based on selected division
    $("#division").on("change", function() {
      var selectedDivision = $(this).val();
      var districtDropdown = $("#district");
      districtDropdown.empty();
      if (selectedDivision === "Dhaka") {
        districtDropdown.append('<option value="">-- Select District --</option>');
        districtDropdown.append('<option value="Dhaka">Dhaka</option>');
        districtDropdown.append('<option value="Gazipur">Gazipur</option>');
        districtDropdown.append('<option value="Narayanganj">Narayanganj</option>');
        districtDropdown.append('<option value="Faridpur">Faridpur</option>');
        districtDropdown.append('<option value="Gopalganj">Gopalganj</option>');
        districtDropdown.append('<option value="Kishoreganj">Kishoreganj</option>');
        districtDropdown.append('<option value="Madaripur">Madaripur</option>');
        districtDropdown.append('<option value="Manikganj">Manikganj</option>');
        districtDropdown.append('<option value="Narsingdi">Narsingdi</option>');
        districtDropdown.append('<option value="Rajbari">Rajbari</option>');
        districtDropdown.append('<option value="Rajbari">Rajbari</option>');
        districtDropdown.append('<option value="Tangail">Tangail</option>');
       
      }else if(selectedDivision === "Barishal"){
        districtDropdown.append('<option value="">-- Select District --</option>');
        districtDropdown.append('<option value="Barguna">Barguna</option>');
        districtDropdown.append('<option value="Barisal">Barisal</option>');
        districtDropdown.append('<option value="Bhola">Bhola</option>');
        districtDropdown.append('<option value="Jhalokati">Jhalokati</option>');
        districtDropdown.append('<option value="Patuakhali">Patuakhali</option>');
        districtDropdown.append('<option value="Pirojpur">Pirojpur</option>');
      }else if(selectedDivision === "Sylhet"){
        districtDropdown.append('<option value="">-- Select District --</option>');
        districtDropdown.append('<option value="Habiganj">Habiganj</option>');
        districtDropdown.append('<option value="Moulvibazar">Moulvibazar</option>');
        districtDropdown.append('<option value="Sunamganj">Sunamganj</option>');
        districtDropdown.append('<option value="Sylhet">Sylhet</option>');
    
    }else if(selectedDivision === "Khulna"){
      districtDropdown.append('<option value="">-- Select District --</option>');
      districtDropdown.append('<option value="Bagerhat">Bagerhat</option>');
      districtDropdown.append('<option value="Chuadanga">Chuadanga</option>');
      districtDropdown.append('<option value="Jessore">Jessore</option>');
      districtDropdown.append('<option value="Jhenaidah">Jhenaidah</option>');
      districtDropdown.append('<option value="Khulna">Khulna</option>');
      districtDropdown.append('<option value="Kushtia">Kushtia</option>');
      districtDropdown.append('<option value="Magura">Magura</option>');
      districtDropdown.append('<option value="Meherpur">Meherpur</option>');
      districtDropdown.append('<option value="Narail">Narail</option>');
      districtDropdown.append('<option value="Satkhira">Satkhira</option>');
    }else if(selectedDivision === "Chattogram"){
      districtDropdown.append('<option value="">-- Select District --</option>');
      districtDropdown.append('<option value="Bandarban">Bandarban</option>');
      districtDropdown.append('<option value="Brahmanbaria">Brahmanbaria</option>');
      districtDropdown.append('<option value="Chandpur">Chandpur</option>');
      districtDropdown.append('<option value="Chittagong">Chittagong</option>');
      districtDropdown.append('<option value="Comilla">Comilla</option>');
      districtDropdown.append('<option value="Noakhali">Noakhali</option>');
      districtDropdown.append('<option value="Cox-s Bazar">Cox-s Bazar</option>');
      districtDropdown.append('<option value="Feni">Feni</option>');
      districtDropdown.append('<option value="Khagrachhari">Khagrachhari</option>');
      districtDropdown.append('<option value="Lakshmipur">Lakshmipur</option>');
      districtDropdown.append('<option value="Rangamati">Rangamati</option>');
    
    }else if(selectedDivision === "Rajshahi"){
      districtDropdown.append('<option value="">-- Select District --</option>');
      districtDropdown.append('<option value="Bogra">Bogra</option>');
      districtDropdown.append('<option value="Chapainawabganj">Chapainawabganj</option>');
      districtDropdown.append('<option value="Joypurhat">Joypurhat</option>');
      districtDropdown.append('<option value="Naogaon">Naogaon</option>');
      districtDropdown.append('<option value="Natore">Natore</option>');
      districtDropdown.append('<option value="Pabna">Pabna</option>');
      districtDropdown.append('<option value="Rajshahi">Rajshahi</option>');
      districtDropdown.append('<option value="Sirajganj">Sirajganj</option>');
    
    }else if(selectedDivision === "Rangpur"){
      districtDropdown.append('<option value="">-- Select District --</option>');
      districtDropdown.append('<option value="Dinajpur">Dinajpur</option>');
      districtDropdown.append('<option value="Gaibandha">Gaibandha</option>');
      districtDropdown.append('<option value="Kurigram">Kurigram</option>');
      districtDropdown.append('<option value="Lalmonirhat">Lalmonirhat</option>');
      districtDropdown.append('<option value="Nilphamari">Nilphamari</option>');
      districtDropdown.append('<option value="Panchagarh">Panchagarh</option>');
      districtDropdown.append('<option value="Rangpur">Rangpur</option>');
      districtDropdown.append('<option value="Thakurgaon">Thakurgaon</option>');
    
    }else if(selectedDivision === "Mymensingh"){
      districtDropdown.append('<option value="">-- Select District --</option>');
      districtDropdown.append('<option value="Jamalpur">Jamalpur</option>');
      districtDropdown.append('<option value="Mymensingh">Mymensingh</option>');
      districtDropdown.append('<option value="Netrokona">Netrokona</option>');
      districtDropdown.append('<option value="Sherpur">Sherpur</option>');
    
    }
    });
    
    </script>
    <script src="server.js"></script>
    </body>
    </html>
    `;
    
    res.send(registrationForm);
  });
  
  // Process the registration form
  app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = { username, email, password };
    users.push(newUser);
    res.cookie('loggedIn', 'true');
    res.redirect('/profile');
  });
  
  // Serve the about page
app.get('/about', (req, res) => {
    const aboutPage = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>About Us</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZEb6UksdQRVvoxMfooCJN6" crossorigin="anonymous">
        </head>
        <body>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">My Website</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/profile">Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/about">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/help">Help & Support</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/contact">Contact Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/logout">Log out</a>
                </li>
              </ul>
            </div>
          </nav>
          <div class="container mt-5">
            <h1>About Us</h1>
            <p>We are a company that specializes in providing high-quality web solutions for businesses and individuals. Our team consists of experienced professionals who are passionate about creating beautiful and functional websites that meet the needs of our clients.</p>
          </div>
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-OgoumWswifh3pO3E1zDKtnIvymDwGZDR0RbQTusk&Me8BQ5GK6LrVuYz850G6f5Q" crossorigin="anonymous"></script>
        </body>
      </html>
    `;
    res.send(aboutPage);
  });
  
  // Serve the help page
  app.get('/help', (req, res) => {
    const helpPage = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Help & Support</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZEb6UksdQRVvoxMfooCJN6" crossorigin="anonymous">
        </head>
        <body>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">My Website</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/profile">Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/about">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/help">Help & Support</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/contact">Contact Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/logout">Log out</a>
                </li>
              </ul>
            </div>
          </nav>
          <div class="container mt-5">
            <h1>Help & Support</h1>
            <p>If you are experiencing any issues or have any questions about our services, please do not hesitate to contact our support team. You can reach us via email or phone and we will be happy to assist you in any way we can.</p>
          </div>
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-OgoumWswifh3pO3E1zDKtnIvymDwGZDR0RbQTusk&Me8BQ5GK6LrVuYz850G6f5Q" crossorigin="anonymous"></script>
        </body>
      </html>
    `;
    res.send(helpPage);
  });
  
  // Serve the contact page
  app.get('/contact', (req, res) => {
    const contactPage = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZEb6UksdQRVvoxMfooCJN6" crossorigin="anonymous">
      </head>
      <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">My Website</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/profile">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/help">Help & Support</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact">Contact Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/logout">Log out</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="container mt-5">
          <h1>Contact Us</h1>
          <h1>Contact Us</h1>
          <p>Have any questions or feedback for us? Please feel free to get in touch with our team using the information below:</p>
          <ul>
            <li>Email: contact@mywebsite.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Main Street, Anytown, USA</li>
          </ul>
          <p>If you have any questions or concerns, please don't hesitate to contact us. You can reach us via email, phone, or by filling out the contact form below.</p>
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" placeholder="Enter your name">
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea class="form-control" id="message" rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-OgoumWswifh3pO3E1zDKtnIvymDwGZDR0RbQTusk&Me8BQ5GK6LrVuYz850G6f5Q" crossorigin="anonymous"></script>
        </body></html>
        `;
        res.send(contactPage);
      });
      
      // Serve the logout page
      app.get('/logout', (req, res) => {
        const logoutPage = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Log out</title>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZEb6UksdQRVvoxMfooCJN6" crossorigin="anonymous">
            </head>
            <body>
              <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">My Website</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" href="/profile">Profile</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/about">About Us</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/help">Help & Support</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/contact">Contact Us</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/logout">Log out</a>
                  </li>
                </ul>
              </div>
            </nav>
            <div class="container mt-5">
              <h1>Log out</h1>
              <p>You have been logged out. Thank you for using our website!</p>
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-OgoumWswifh3pO3E1zDKtnIvymDwGZDR0RbQTusk&Me8BQ5GK6LrVuYz850G6f5Q" crossorigin="anonymous"></script>
          </body>
        </html>
      `;
      // Clear the session data and redirect to the login page
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
        res.redirect('/login');
      });
    });
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });