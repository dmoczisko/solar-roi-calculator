# Solar ROI Calculator - OpenShift Demo

A simple React application demonstrating OpenShift deployment workflows and platform features.

## Application Overview

This calculator helps users estimate the return on investment for solar panel installations by calculating:
- Annual savings based on current electric bills
- Break-even timeline
- 20-year net savings projection

**Built with:** React + Vite, deployed on Red Hat OpenShift

---

## OpenShift Features Demonstrated

### 1. Source-to-Image (S2I) Deployment
The application is deployed directly from GitHub using OpenShift's S2I workflow:
```bash
oc new-app https://github.com/dmoczisko/solar-roi-calculator --name=solar-calculator
```

OpenShift automatically:
- Detects Node.js from `package.json`
- Runs `npm install` and `npm run build`
- Containerizes the application
- Deploys and manages the running containers

### 2. Configuration Management with ConfigMaps
Environment-specific configuration is separated from code using ConfigMaps:
```bash
oc create configmap solar-config --from-literal=DEFAULT_RATE=0.13
oc set env deployment/solar-calculator --from=configmap/solar-config
```

This allows different values in dev/staging/production without code changes.

### 3. Health Checks
Liveness and readiness probes ensure application reliability:
```bash
# Liveness: Restarts pod if failing
oc set probe deployment/solar-calculator --liveness --get-url=http://:8080/

# Readiness: Stops traffic to unhealthy pods
oc set probe deployment/solar-calculator --readiness --get-url=http://:8080/
```

### 4. Auto-Scaling
Horizontal Pod Autoscaler automatically adjusts pod count based on CPU usage:
```bash
oc autoscale deployment/solar-calculator --min=1 --max=5 --cpu=70%
```

OpenShift scales up during traffic spikes and scales down when load decreases.

### 5. Secure Routes (HTTPS)
External access is configured with automatic TLS termination:
```bash
oc create route edge solar-calculator --service=solar-calculator
```

OpenShift handles SSL certificate provisioning and renewal.

---

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
git clone https://github.com/YOUR-USERNAME/solar-roi-calculator.git
cd solar-roi-calculator
npm install
npm run dev
```

Application runs at `http://localhost:5173`

---

## OpenShift Deployment

### Initial Deployment
```bash
# Login to OpenShift cluster
oc login --token=YOUR_TOKEN --server=YOUR_SERVER

# Create new project
oc new-project solar-demo

# Deploy application
oc new-app https://github.com/YOUR-USERNAME/solar-roi-calculator --name=solar-calculator

# Watch build progress
oc logs -f buildconfig/solar-calculator

# Expose with HTTPS
oc create route edge solar-calculator --service=solar-calculator

# Get application URL
oc get route solar-calculator
```

### Updating the Application
```bash
# After pushing code changes to GitHub
oc start-build solar-calculator

# Watch the build
oc logs -f buildconfig/solar-calculator
```

### Useful Commands
```bash
# View running pods
oc get pods

# Check pod logs
oc logs POD_NAME

# Scale manually
oc scale deployment/solar-calculator --replicas=3

# View autoscaler status
oc get hpa

# Describe deployment details
oc describe deployment solar-calculator
```

---

## Architecture
```
User Request (HTTPS)
    ↓
[OpenShift Router/Load Balancer]
    ↓
[Service: solar-calculator]
    ↓
┌───────┬───────┬───────┐
│ Pod 1 │ Pod 2 │ Pod 3 │  ← Auto-scaled based on load
└───────┴───────┴───────┘
    ↓
[ConfigMap: solar-config]
```

---

## Key Takeaways

This project demonstrates understanding of:
- **Container orchestration** - OpenShift manages deployment, scaling, and healing
- **Configuration management** - Separation of config from code
- **High availability** - Health checks and auto-scaling ensure reliability
- **Security** - Automatic HTTPS with certificate management
- **Developer workflow** - Git push → automated build → deployment

These are core patterns used in enterprise OpenShift deployments for production applications.

---

## Future Enhancements

- Add backend API for more complex calculations
- Integrate with external electricity rate APIs
- Implement user authentication
- Add persistent storage for calculation history
- Set up CI/CD pipeline with webhooks
- Create separate dev/staging/production environments