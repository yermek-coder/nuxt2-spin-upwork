import api from "./api"

class OnbordingService {
    submission(form) {
        return api.post("user/onboarding/submission.php", form)
    }
}

export default new OnbordingService()