pipeline {
  agent any
  stages {
    stage('Deploy through SSH') {
      steps {
        script {
          def remote = [name: 'ubuntu', host: 'devscholas.folclass.com', user: 'ubuntu', allowAnyHosts: true]
          withCredentials([sshUserPrivateKey(credentialsId: 'ec2-scholas-dev', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'ubuntu')]) {
            remote.user = ubuntu
            remote.identityFile = identity
            sshCommand remote: remote, command: 'cd /home/ubuntu/scholas/front_scholas ; git checkout dev ; git pull'
            sshCommand remote: remote, command: 'cd /home/ubuntu/scholas ; docker-compose build front_scholas ; docker-compose up -d'
            sshCommand remote: remote, command: 'docker image prune -af'
          }
        }
      }
    }
  }
  post {
      success {
      mail to:"dmedel@folcode.com", subject:"SUCCESS: ${currentBuild.fullDisplayName}", body: "Well done is better than well said."
      }
      failure {
      mail to:"dmedel@folcode.com", subject:"FAILURE: ${currentBuild.fullDisplayName}", body: "Houston, we have a problem here."
      }   
    }
}