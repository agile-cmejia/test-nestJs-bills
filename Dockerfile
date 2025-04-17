FROM node:18

#Define working dir inside the container
WORKDIR /app


#Copy app into container
COPY ./src/ /app/src/
COPY *.json /app/
#COPY *.lock /app/
COPY *.npmrc /app/
COPY sonar-project.properties /app/
#COPY ./.git/ /app/.git/

# AWS CLI installation and authentication commands
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf awscliv2.zip

# Pass in AWS credentials and region as build arguments
ARG AWS_REGION
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_ACCESS_KEY_ID  
ARG AWS_SESSION_TOKEN

ENV AWS_REGION=${AWS_REGION}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}

# Verify AWS credentials are valid
RUN aws sts get-caller-identity 

# Authenticate with AWS CodeArtifact
RUN aws codeartifact login --tool npm --repository CA_REPOSITORY --domain CA_DOMAIN --domain-owner 067435599643 --region AWS_REGION

#Install dependencies
RUN yarn install

RUN yarn test:cov

# Install and configure SonarQube Scanner
ARG BRANCH_NAME
ENV BRANCH_NAME=${BRANCH_NAME}
ARG SONAR_TOKEN
ENV SONAR_TOKEN=${SONAR_TOKEN}
ENV SONAR_SCANNER_VERSION=5.0.1.3006
ENV SONAR_SCANNER_HOME=/.sonar/sonar-scanner-$SONAR_SCANNER_VERSION-linux
RUN curl --create-dirs -sSLo /.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip \
    && unzip -o /.sonar/sonar-scanner.zip -d /.sonar/ \
    && rm /.sonar/sonar-scanner.zip
ENV PATH=$SONAR_SCANNER_HOME/bin:$PATH
ENV SONAR_SCANNER_OPTS="-server"

RUN sonar-scanner \
-Dsonar.sources=. \
-Dsonar.host.url=https://sonar.orderbahn.com \
-Dsonar.branch.name=$BRANCH_NAME



RUN yarn build


EXPOSE 3000

CMD ["yarn", "start"]
