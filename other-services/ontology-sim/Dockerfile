FROM python:3.9-bullseye

WORKDIR /app

# Install system deps + Node.js 18 (LTS)
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs yarn && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Python packages
RUN pip install -U pip pipenv setuptools

# Copy project files
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node dependencies
RUN npm install
RUN npm install serverless@3.11.0 --legacy-peer-deps
RUN npm i -g nodemon
RUN npm install serverless-python-requirements


EXPOSE 3000

# CMD ["node", "./node_modules/serverless/bin/serverless.js", "requirements", "install"]
CMD ["nodemon","-e","py","--exec", "npm", "run","dev"]



