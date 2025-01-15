# GitLab CI/CD on Kubernetes

## Objective
Host an open-source GitLab CE version inside **Google Cloud Autopilot**, **GKE Standard**, or the equivalent on **AWS** or **Azure**. Then, use GitLab CI/CD to build and deploy a sample API on the same Kubernetes cluster in a separate namespace. Demonstrate the API's functionality and ensure security best practices are implemented.

> **Note:** Feel free to use any public cloud provider from **AWS**, **GCP**, or **Azure**.

## Step-by-Step Instructions for GCP implemetation:

1. **Set up Google Cloud Free Account**  
   - [Sign up](https://cloud.google.com/free/?hl=en) for a free Google Cloud account.

2. **Host GitLab CE in GKE:**  
   - [Install and configure](https://docs.gitlab.com/charts/) the open-source GitLab CE version on **Google Kubernetes Engine (GKE)**.  
   - You may use either **GKE Standard** or **GKE Autopilot** as your hosting environment.

3. **Create and Deploy Sample API:**  
   - Use **GitLab CI/CD** pipelines to build and deploy any [sample API](https://cloud.google.com/kubernetes-engine/docs/samples/container-helloapp-deployment)(for example helloworld) to **another namespace** in the same GKE cluster.  
   - Ensure the API can be accessed and is functional once deployed.

4. **Test API:**  
   - Use `curl` to interact with the deployed API and demonstrate that it is working correctly.

5. **Ensure Security Best Practices:**
   - **GCP Workload Identity**: Implement GCP Workload Identity for secure identity management and avoid static credentials.
   - **GKE Best Practices**: Follow GKE security best practices for cluster setup and management (e.g., least privilege principle, network policies, node auto-upgrade).
   - **GitOps Best Practices**: Use GitOps principles for configuration management, ensuring changes are versioned and tracked.
   - **CI/CD Best Practices**: Secure the CI/CD pipeline by restricting permissions and storing sensitive data like secrets securely.

6. **Infrastructure as Code (IaC) with Terraform:**  
   - Use **Terraform** to automate the entire process, including provisioning of resources and deployments on GKE.

7. **Submission Requirements:**
   - Share the **Terraform code** for review.
   - Provide necessary **credentials** (service account, API keys, etc.) to validate the solution.

8. **Additional Information:**  
   - Focus on creating a secure, scalable, and efficient deployment.
   - Ensure that all resources created follow GCP cost-optimization guidelines.

## Deliverables:
- Link to the GitLab repository with Terraform code and CI/CD pipelines.
- Credentials and necessary access information for validation.
- A brief documentation or README explaining the approach, best practices followed, and how to validate the deployment.

**Good luck!**
