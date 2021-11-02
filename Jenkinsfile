pipeline {
  agent any
  stages {
    stage('Deploy through SSH') {
      steps {
        script {
          def remote = [name: 'ubuntu', host: '3.238.7.184', user: 'ubuntu', allowAnyHosts: true]
          withCredentials([sshUserPrivateKey(credentialsId: 'ec2-scholas-dev', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'ubuntu')]) {
            remote.user = ubuntu
            remote.identityFile = identity
            sshCommand remote: remote, command: 'cd /home/ubuntu/scholas/front_scholas ; git checkout dev ; git pull'
            sshCommand remote: remote, command: 'cd /home/ubuntu/scholas ; docker-compose build ; docker-compose up -d'
            sshCommand remote: remote, command: 'docker image prune -af'
          }
        }
      }
    }
  }
}