using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        // This shit [EmailAddress] check only '@' symbol in string.
        // Need fix this... (maybe later with regexp)
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        // (?=^.{12,25}$) -- password length range from 8 to 25
        // (?=(?:.*?[!@#$%*()_+^&}{:;?.]){1}) -- at least 1 special character
        // (?=(?:.*?\d){1}) -- at least 1 digit
        // (?=(?:.*?[A-Z]){1}) -- at least 1 upper case character
        // just change numbers, Luke!..
        [Required]
        [RegularExpression("(?=^.{8,25}$)(?=(?:.*?\\d){1})(?=.*[a-z])(?=(?:.*?[A-Z]){1})" +
                           "(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\\s)[0-9a-zA-Z!@#$%*()_+^&]*$",
            ErrorMessage = "Password must have 1 Uppercase, 1 special char, 1 number and " +
                           "at least 8 characters")]
        public string Password { get; set; }
    }
}
