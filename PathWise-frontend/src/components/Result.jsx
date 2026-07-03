import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExpandProfile } from "./ExpandProfile";
import { 
  Trophy, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ArrowRight,
  Award,
  Star,
  Target,
  TrendingUp,
  Lightbulb,
  BookOpen,
  Loader2
} from "lucide-react";
import { callNimApi } from "../utils/nimApi";

export default function Result() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedPath, setSelectedPath] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [score, setScore] = useState(0);
  const [useAiQuestions, setUseAiQuestions] = useState(false);
  
  // AI Feedback States (Assessment mode)
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);

  // Roadmap Mode States
  const [isRoadmapMode, setIsRoadmapMode] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [roadmapError, setRoadmapError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get('course') || "Computer Science";
    const path = urlParams.get('path') || "fintech";
    const role = urlParams.get('role') || "software-engineer";
    const skill = urlParams.get('skill') || "javascript";
    const hasScore = urlParams.get('score') !== null;
    const useAi = urlParams.get('useAi') === 'true';
    
    setSelectedCourse(course);
    setSelectedPath(path);
    setSelectedRole(role);
    setSelectedSkill(skill);
    setUseAiQuestions(useAi);

    if (hasScore) {
      const scoreParam = parseInt(urlParams.get('score')) || 85;
      setScore(scoreParam);
      setIsRoadmapMode(false);
      generateAiFeedback(skill, scoreParam, useAi);
    } else {
      setIsRoadmapMode(true);
      generateCareerRoadmap(role, path, course);
    }
  }, []);

  // AI Feedback Generation Function using NVIDIA NIM API
  const generateAiFeedback = async (skillName, userScore, wasAiGenerated) => {
    setLoadingFeedback(true);
    setFeedbackError(null);

    try {
      const assessmentType = wasAiGenerated ? "AI-generated" : "standard";
      const performanceLevel = userScore >= 90 ? "excellent" : 
                              userScore >= 75 ? "good" : 
                              userScore >= 60 ? "fair" : "needs improvement";

      const message = `Provide personalized feedback for a student who just completed a ${assessmentType} assessment on "${skillName}" and scored ${userScore}%.

CONTEXT:
- Skill assessed: ${skillName}
- Score achieved: ${userScore}%
- Performance level: ${performanceLevel}
- Pass threshold: 75%

Format your response as a valid JSON object with the following structure, with no other text around it:
{
  "analysis": "Performance analysis text (2-3 sentences)",
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Area 1", "Area 2"],
  "nextSteps": ["Step 1", "Step 2", "Step 3"],
  "motivation": "Motivational message..."
}

Make the feedback specific to ${skillName} and their ${userScore}% performance.`;

      const botResponse = await callNimApi({
        messages: [{ role: 'user', content: message }],
        temperature: 0.2,
        max_tokens: 2048
      });

      const feedback = parseFeedbackFromResponse(botResponse);
      
      if (feedback) {
        setAiFeedback(feedback);
        console.log(`Generated AI feedback for ${skillName} with score ${userScore}%`);
      } else {
        throw new Error('Invalid feedback format received');
      }

    } catch (error) {
      console.error(`Error generating feedback for ${skillName}:`, error);
      setFeedbackError(`Failed to generate feedback: ${error.message}`);
    } finally {
      setLoadingFeedback(false);
    }
  };

  // AI Career Roadmap Generation Function using NVIDIA NIM API
  const generateCareerRoadmap = async (roleName, pathName, courseName) => {
    setLoadingRoadmap(true);
    setRoadmapError(null);

    try {
      const prompt = `Generate a highly detailed, step-by-step career progression roadmap for a student who studied "${courseName}" and wants to pursue a career as a "${roleName}" in the "${pathName}" sector.
      
Provide exactly 5 logical phases/milestones of career growth:
1. Foundation & Fundamentals
2. Core Technical Skills
3. Practical Application & Building
4. Advanced Specialization & Tooling
5. Professional Readiness & Job Hunting

Format the response as a valid JSON array of objects, with no other text around it. Each object must have:
- "phase": integer (1-5)
- "title": "Phase Title"
- "description": "What to focus on in this phase (2-3 sentences)"
- "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"]
- "duration": "Recommended duration (e.g. 4-6 weeks)"
- "milestone": "The concrete milestone/project to complete to pass this phase"

Return ONLY the JSON array.`;

      const botResponse = await callNimApi({
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 3072
      });

      const parsedRoadmap = parseRoadmapFromResponse(botResponse);
      if (parsedRoadmap && parsedRoadmap.length > 0) {
        setRoadmapData(parsedRoadmap);
        console.log(`Generated career roadmap for ${roleName}`);
      } else {
        throw new Error("Could not parse career roadmap JSON");
      }
    } catch (error) {
      console.error("Error generating career roadmap:", error);
      setRoadmapData(getFallbackRoadmap(roleName, pathName));
    } finally {
      setLoadingRoadmap(false);
    }
  };

  // Parse Career Roadmap JSON
  const parseRoadmapFromResponse = (aiResponse) => {
    try {
      let cleaned = aiResponse.trim();
      const jsonStart = cleaned.indexOf('[');
      const jsonEnd = cleaned.lastIndexOf(']');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
      }
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) {
        return parsed.filter(item => item.phase && item.title && item.description && Array.isArray(item.skills));
      }
      return null;
    } catch (e) {
      console.error("Failed to parse roadmap:", e);
      return null;
    }
  };

  // Fallback Career Roadmap
  const getFallbackRoadmap = (roleName, pathName) => {
    const formattedRoleName = roleName ? roleName.replace(/-/g, " ") : "Specialist";
    return [
      {
        phase: 1,
        title: "Foundation & Fundamentals",
        description: `Get familiar with the base principles of ${formattedRoleName} and understand how the ${pathName || 'chosen'} industry operates.`,
        skills: ["Core Concepts", "Basic Tools", "Industry Standards", "Key Terminologies"],
        duration: "4 weeks",
        milestone: "Complete introductory courses and write a summary of key concepts."
      },
      {
        phase: 2,
        title: "Core Skills Mastery",
        description: `Deep dive into the critical hands-on skills required daily as a ${formattedRoleName}.`,
        skills: ["Programming/Technical Stack", "Debugging & Troubleshooting", "Version Control", "System design"],
        duration: "6 weeks",
        milestone: "Build 3 mini-apps/scripts demonstrating core mechanics."
      },
      {
        phase: 3,
        title: "Practical Projects & Tools",
        description: "Integrate your knowledge by using industry-grade frameworks, libraries, and design patterns.",
        skills: ["Advanced Frameworks", "API Integration", "Database Design", "Performance Optimization"],
        duration: "8 weeks",
        milestone: "Create and deploy a full-scale personal project with authentication."
      },
      {
        phase: 4,
        title: "Specialization & Best Practices",
        description: "Focus on testing, security, deployment pipelines, and advanced features for professional-grade development.",
        skills: ["Unit & Integration Testing", "CI/CD Pipelines", "App Security", "Cloud Services"],
        duration: "4 weeks",
        milestone: "Implement comprehensive tests and set up automated deployments for your project."
      },
      {
        phase: 5,
        title: "Portfolio & Job Hunt",
        description: "Polishing your resume, compiling your portfolio, practicing interviews, and networking in the industry.",
        skills: ["Resume Building", "System Design Interviews", "LeetCode Practice", "LinkedIn Optimization"],
        duration: "4 weeks",
        milestone: "Apply to at least 15 roles and complete 2 mock interviews."
      }
    ];
  };

  // Function to parse AI response and extract feedback
  const parseFeedbackFromResponse = (aiResponse) => {
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.analysis) {
          return parsed;
        }
      }

      // Fallback: Parse manually
      const analysisMatch = aiResponse.match(/analysis["\s:]*([^"]*)/i);
      const strengthsMatch = aiResponse.match(/strengths["\s:]*\[(.*?)\]/is);
      const improvementsMatch = aiResponse.match(/improvements["\s:]*\[(.*?)\]/is);
      const nextStepsMatch = aiResponse.match(/nextSteps["\s:]*\[(.*?)\]/is);
      const motivationMatch = aiResponse.match(/motivation["\s:]*([^"]*)/i);

      if (analysisMatch) {
        return {
          analysis: analysisMatch[1].trim(),
          strengths: strengthsMatch ? JSON.parse(`[${strengthsMatch[1]}]`) : [],
          improvements: improvementsMatch ? JSON.parse(`[${improvementsMatch[1]}]`) : [],
          nextSteps: nextStepsMatch ? JSON.parse(`[${nextStepsMatch[1]}]`) : [],
          motivation: motivationMatch ? motivationMatch[1].trim() : ""
        };
      }

      return null;
    } catch (error) {
      console.error('Error parsing feedback:', error);
      return null;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleRetakeTest = () => {
    const testUrl = `/test?course=${encodeURIComponent(selectedCourse)}&path=${selectedPath}&role=${selectedRole}&skill=${selectedSkill}`;
    navigate(testUrl);
  };

  const handleContinueLearning = () => {
    navigate('/skills');
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 75) return "bg-blue-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return "Excellent Performance!";
    if (score >= 75) return "Good Performance!";
    if (score >= 60) return "Fair Performance";
    return "Needs Improvement";
  };

  const getPerformanceIcon = (score) => {
    if (score >= 90) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (score >= 75) return <Award className="w-8 h-8 text-blue-500" />;
    if (score >= 60) return <Target className="w-8 h-8 text-yellow-500" />;
    return <XCircle className="w-8 h-8 text-red-500" />;
  };

  if (isRoadmapMode) {
    return (
      <div className="min-h-screen bg-paper py-12 px-4 relative overflow-hidden">
        {/* Animated background blurs */}
        <div
          className="absolute pointer-events-none animate-pulse"
          style={{
            top: '-10%',
            left: '5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(1,116,43,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 0
          }}
        />
        <div
          className="absolute pointer-events-none animate-pulse"
          style={{
            bottom: '-15%',
            right: '0%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
            filter: 'blur(100px)',
            zIndex: 0,
            animationDelay: '1s'
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <span className="font-display text-xl font-semibold text-ink">
              Pathwise <span className="text-forest">AI</span>
            </span>
            <ExpandProfile />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              Your Career Roadmap 🚀
            </h1>
            <p className="text-lg text-ink-soft max-w-2xl mx-auto leading-relaxed">
              Step-by-step career path to becoming a <span className="font-semibold text-forest capitalize">{selectedRole?.replace(/-/g, ' ')}</span>.
            </p>
          </div>

          {loadingRoadmap ? (
            <div className="bg-card backdrop-blur-xl rounded-3xl shadow-xl border border-green-100 p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Loader2 className="w-8 h-8 animate-spin text-forest" />
                <h3 className="text-2xl font-bold text-forest">Generating Career Roadmap</h3>
              </div>
              <p className="text-ink-soft">
                Our AI is building a customized progression path for your selected career role...
              </p>
            </div>
          ) : roadmapData ? (
            <div className="space-y-8 mb-12 relative before:absolute before:inset-0 before:left-8 before:w-1 before:bg-gradient-to-b before:from-forest/20 before:to-sage-ink/10 before:rounded">
              {roadmapData.map((step, index) => (
                <div key={index} className="flex gap-6 relative group">
                  {/* Timeline dot */}
                  <div className="w-16 h-16 rounded-full bg-forest text-paper flex items-center justify-center font-bold text-xl shrink-0 shadow-lg border-4 border-paper group-hover:scale-115 transition-transform duration-300">
                    {step.phase}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-card border border-card-line hover:border-forest rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                      <span className="text-xs bg-sage-bg text-sage-ink px-3 py-1 rounded-full font-medium">
                        ⏱️ {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-ink-soft leading-relaxed mb-4">{step.description}</p>
                    
                    {/* Skills list */}
                    <div className="mb-4">
                      <span className="text-xs text-ink-faint uppercase font-bold tracking-wider block mb-2">Key Skills to Learn</span>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((sk, skIdx) => (
                          <span key={skIdx} className="text-xs bg-paper-soft text-ink-soft border border-card-line px-2.5 py-1 rounded-lg">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestone */}
                    <div className="mt-4 pt-4 border-t border-card-line bg-sage-bg/30 -mx-6 -mb-6 px-6 py-4 rounded-b-3xl flex items-start gap-2.5">
                      <span className="text-base text-forest mt-0.5">🏆</span>
                      <div>
                        <span className="text-xs font-semibold text-forest uppercase tracking-wider block">Phase Milestone</span>
                        <span className="text-sm text-ink font-medium">{step.milestone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card backdrop-blur-xl rounded-3xl shadow-xl border border-red-300 p-8 text-center mb-12">
              <p className="text-lg font-semibold text-red-500">Failed to load roadmap.</p>
              <p className="text-sm text-ink-soft mt-2">Please try reloading the page.</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              onClick={() => navigate(`/skills?course=${encodeURIComponent(selectedCourse)}&path=${selectedPath}&role=${selectedRole}`)}
              className="flex items-center justify-center gap-2 border border-card-line text-ink-soft hover:border-forest hover:text-forest px-8 py-4 rounded-2xl font-semibold transition-colors cursor-pointer bg-card"
            >
              ← Back to Skills
            </button>
            <button
              onClick={() => navigate(`/project-page?course=${encodeURIComponent(selectedCourse)}&path=${selectedPath}&role=${selectedRole}`)}
              className="flex items-center justify-center gap-2 bg-forest text-paper hover:bg-forest-dark px-10 py-4 rounded-2xl font-semibold transition-all hover:scale-105 shadow-lg cursor-pointer"
            >
              Continue to Project Page
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ink mb-4">Assessment Results</h1>
          <p className="text-ink-soft">
            Your performance on the {selectedSkill} assessment
            {useAiQuestions && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                🤖 AI Generated
              </span>
            )}
          </p>
        </div>

        {/* Score Card */}
        <div className={`bg-white rounded-3xl shadow-2xl p-8 mb-8 ${getScoreBackground(score)}`}>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              {getPerformanceIcon(score)}
            </div>
            <h2 className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
              {score}%
            </h2>
            <h3 className={`text-2xl font-semibold mb-2 ${getScoreColor(score)}`}>
              {getPerformanceMessage(score)}
            </h3>
            <p className="text-gray-600 mb-6">
              {score >= 75 ? "Congratulations! You've passed the assessment." : "You'll need to retake the assessment to pass."}
            </p>
            
            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${
                  score >= 90 ? "bg-green-500" :
                  score >= 75 ? "bg-blue-500" :
                  score >= 60 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">Passing score: 75%</p>
          </div>
        </div>

        {/* AI Feedback Section */}
        {loadingFeedback ? (
          <div className="bg-card backdrop-blur-xl rounded-3xl shadow-xl border border-blue-300 p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
              <h3 className="text-xl font-bold text-blue-400">Generating Personalized Feedback</h3>
            </div>
            <p className="text-ink-soft text-center">
              Our AI is analyzing your performance and preparing customized recommendations...
            </p>
          </div>
        ) : feedbackError ? (
          <div className="bg-card backdrop-blur-xl rounded-3xl shadow-xl border border-red-300 p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-bold text-red-400">Feedback Generation Failed</h3>
            </div>
            <p className="text-ink-soft">{feedbackError}</p>
          </div>
        ) : aiFeedback ? (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900">
                Personalized AI Feedback
              </h3>
            </div>

            {/* Performance Analysis */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Performance Analysis
              </h4>
              <p className="text-gray-700 leading-relaxed">{aiFeedback.analysis}</p>
            </div>

            {/* Strengths */}
            {aiFeedback.strengths && aiFeedback.strengths.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-green-500" />
                  Your Strengths
                </h4>
                <ul className="space-y-2">
                  {aiFeedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas for Improvement */}
            {aiFeedback.improvements && aiFeedback.improvements.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {aiFeedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {aiFeedback.nextSteps && aiFeedback.nextSteps.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Recommended Next Steps
                </h4>
                <ol className="space-y-3">
                  {aiFeedback.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Motivation Message */}
            {aiFeedback.motivation && (
              <div className="bg-blue-50 rounded-2xl p-6">
                <p className="text-blue-900 font-medium text-center italic">
                  "{aiFeedback.motivation}"
                </p>
              </div>
            )}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetakeTest}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-ink px-8 py-4 rounded-2xl font-semibold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Assessment
          </button>
          
          <button
            onClick={handleContinueLearning}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-ink px-8 py-4 rounded-2xl font-semibold transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Continue Learning
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <ExpandProfile />
          <p className="text-ink-faint text-sm mt-4">
            Assessment completed on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
