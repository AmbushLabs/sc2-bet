FROM ubuntu:14.04


RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y build-essential && \
  apt-get install -y software-properties-common && \
  apt-get install -y byobu curl git htop man unzip vim wget && \
  apt-get install -y openjdk-7-jdk && \
  apt-get install -y tomcat7 && \
  rm -rf /var/lib/tomcat7/webapps/* && \
  rm -rf /var/lib/apt/lists/*

# Install application requirements
RUN curl -s get.gvmtool.net | bash

# Retrieve the code
RUN mkdir /opt/sc2-bet

# Make ssh dir
RUN mkdir /root/.ssh/


# Copy over private key, and set permissions
ADD github_rsa /root/.ssh/id_rsa
ADD github_rsa.pub /root/.ssh/id_rsa.pub
RUN echo "IdentityFile /root/.ssh/id_rsa" >> /etc/ssh/ssh_config 
RUN ssh-keygen -lf ~/.ssh/id_rsa

# Create known_hosts
RUN touch /root/.ssh/known_hosts
# Add bitbuckets key
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts


#RUN ssh -T git@github.com

# Clone the conf files into the docker container
RUN git clone git@github.com:AmbushLabs/sc2-bet.git /opt/sc2-bet/app


ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64/
# Ready the grails installation
RUN bash -c "source /root/.gvm/bin/gvm-init.sh && gvm install grails 3.0.3; cd /opt/sc2-bet/app; grails war; exit 0;"

WORKDIR /opt/sc2-bet/app/build/libs
RUN ls -lna

RUN mv /opt/sc2-bet/app/build/libs/app-0.1.war /var/lib/tomcat7/webapps/ROOT.war

# Expose the grails web-app port
EXPOSE 8080
# Run the application when running the container with no params
CMD touch /var/lib/tomcat7/logs/catalina.out
CMD tail -f /var/lib/tomcat7/logs/catalina.out &
CMD service tomcat7 start
