![StackUp Banner](https://tinkerhub.frappe.cloud/files/stackup%20banner.jpeg)

# Task Management App

**Task Management App** :-

                     A simple app where a user can create an account and create todos in that account, 
                     these to-dos can be updated or deleted and will be saved to a user’s account.

## Team Members
1. Shamil [profile](https://github.com/muhammedshamil8)
2. Shifna  [profile](https://github.com/shifnashirin)
3. Dayyan [profile](https://github.com/Dayyan404) & second account [profile](https://github.com/minhajp4323)
4. Dheena [profile](https://github.com/dheenanasrin)

## Team ID
- index


## Product Walkthrough

[Watch the Product Walkthrough Video](link-to-video) will upload

[Watch the Product Walkthrough live-site](https://featuresphere.vercel.app/)

## How It Works

1. **Project Overview:**

The Task Management App offers a user-friendly interface for efficient task organization. Key features include:

- User account creation and authentication.
- Creation, update, and deletion of to-dos.
- Profile editing functionality.
- Project creation to organize specific tasks.

Experience seamless task management and enhance your productivity with our app!

2. **Project Demo:**
   - Check out the video demo for a quick overview of the app's features and functionality.
## Feature Coming Things

- Adding team members to the project.
- Implementing a calendar to display task deadlines.
- Introducing more features to enhance user productivity.

Stay tuned for exciting updates!   
## Libraries Used

- **React.js:** v18.2.0
- **PHP (Vanilla):**

## How to Configure

- Clone the Repository
  * git clone [https://github.com/muhammedshamil8/stackup-project]

- Navigate to Project Directory 
  * cd react    

- Install Dependencies
  * npm install

- Back-end
  * install docker for server side / use your preference

    ## How to Run

### Running Locally

1. Install project dependencies.
2. Start the development server.
- Start React Development Server
   * npm start / npm run dev
- Start PHP Development Server
   * docker-compose -f react/docker-compose.yml up 
3. Open your browser and Visit :-.
   * [http://localhost:3000] for react front-end.
   * [http://localhost:9000] for php files api.
   * [http://localhost:8000] for database.

if you using docker >

Before running the project, make sure you have Docker installed on your machine. If not, download and install Docker from [here](https://www.docker.com/get-started).

4. [Watch the Product Running  Video](link-to-video) will upload


**Update API Endpoint:**

During local development, you'll need to update the API endpoint in your React app to point to your local server. 
which all jsx files Axios is set up.
 from
    const api = axios.create({
        baseURL: 'https://test.shamil.strikerlulu.me',
    }); 
  to 
     const api = axios.create({
       baseURL: 'http://localhost:9000/api',
   });

**Explore the App:**

Interact with the app, create tasks, and experience the task management functionalities

**Issues and Contributions**
If you encounter any issues or would like to contribute to the project, please open an issue or submit a pull request.


## Conclusion

Thank you for exploring our project! We hope you find it valuable. If you have any feedback or questions, feel free to [contact us].

