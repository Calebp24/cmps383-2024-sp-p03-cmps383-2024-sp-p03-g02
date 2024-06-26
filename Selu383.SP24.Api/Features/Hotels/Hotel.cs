﻿using Selu383.SP24.Api.Features.Authorization;

namespace Selu383.SP24.Api.Features.Hotels;

public class Hotel
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Address { get; set; }
    public int? ManagerId { get; set; }
    public virtual User Manager { get; set; }
    public string Email { get; set; }
    public string ContactNumber { get; set; }
    public string Image { get; set; }
}

public class FindHotelDto
{
    public string SearchTerm { get; set; }
}
