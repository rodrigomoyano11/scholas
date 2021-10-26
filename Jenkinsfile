pipeline {
  agent any
  stages {
    stage('Deploy through SSH') {
      steps {
        script {
          def remote = [name: 'ubuntu', host: '34.205.134.28', user: 'ubuntu', allowAnyHosts: true]
          withCredentials([sshUserPrivateKey(credentialsId: 'ec2-scholas-dev', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'ubuntu')]) {
            remote.user = ubuntu
            remote.identityFile = identity
            sshCommand remote: remote, command: 'cd /home/ubuntu/scholas/front_scholas ; git checkout dev ; git pull'
            sshCommand remote: remote, command: 'cd /home/ubuntu/scholas ; docker-compose build web-app   ; docker-compose up -d'
            sshCommand remote: remote, command: 'docker image prune -af'
          }
        }
      }
    }
  }
}