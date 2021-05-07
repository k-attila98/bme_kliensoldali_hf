import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Actor } from '../actor';
import { ActorService } from '../services/actor.service';
import { Role } from '../role';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss']
})
export class ActorDetailsComponent implements OnInit {

  errorMessage: string;
  actor: Actor;
  roles: Role[];

  constructor(private route: ActivatedRoute, private actorService: ActorService, private location: Location) { }

  ngOnInit(): void {
    this.getActor()
  }

  getActor()
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActor(id).subscribe(actor => this.actor = actor);
    this.actorService.getRolesForActor(id).subscribe((roles:any) => {
      this.roles = roles.cast;
    },
    error => {
      this.errorMessage = <any>error;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
