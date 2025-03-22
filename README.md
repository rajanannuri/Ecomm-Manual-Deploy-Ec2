# Ecomm-Manual-Deployment-Ec2-Node.js:
# Install Node.js package
# make a directory for order-service
mkdir /home/ec2-user/order-service
cd /home/ec2-user/order-service
yum update -y
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
yum install -y nodejs
npm install
# npm installs dependencies from package.json, such as:
"dependencies": {
    "express": "^4.18.2",
    "pg": "^8.10.0",
    "redis": "^4.6.7"
}

# Check Version
node -v
npm -v







