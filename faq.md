# General

## I'm lost, where can I find support ?

Since you are reading this FAQ, we suppose you already know how to
find the documentation. If you need any further explanation, advice,
tips, etc. contact us at: hpc@unige.ch. We will try to answer your
demand as soon as possible.

## Could you create an account on the cluster ?

Any researcher of the University of Geneva can request a an account on
Baobab. You just need to contact us at hpc@unige.ch. Please provide
the following informations:

-   Your name
-   The name of the principal investigator of your lab
-   Your department
-   A few sentences about the kind of computations that you intend to
    run on the cluster.

No need to submit a proposal.

## Can you provide access to Baobab for external researcher ?

In principle Baobab is reserved for the members of the University of
Geneva. But if you collaborate tightly with a researcher from another
institution, you can provide him/her an access, by following the next two steps:

1.  Ask your administrator to register the external member in the University
    database by using the procedure detailed in 
    <http://wadma.unige.ch:3148/aide/liste_gestionnaires_externes.pdf>
2.  Proceed with the account request procedure as described in the
    preceding question.

## Can I use the cluster for teaching ?

Yes, depending on your needs. Contact us at hpc@unige.ch to discuss
the details.

## I don't know Linux, where can I start ?

You don't need to learn much to start using Baobab. However, being
comfortable will both command line and shell scripting will greatly
improve your experience.

The following tutorials contains all you need to know to go from total beginner to advanced user:

-   <http://linuxcommand.org> (highly recommanded)
-   <http://linuxtutorial.todolistme.net/>
-   <http://vic.gedris.org/Manual-ShellIntro/1.2/ShellIntro.pdf>

# Storage

## What amount of storage space is available ?

Currently we don't use any quota system and there are 40 TB of storage
to share with all the other users. So do not use Baobab to store your
old experiment results but try to deleted unneeded files and try to
move your results to another machine as soon as possible.

## How can I make my data accessible on the computing nodes ?

Your home directory is mounted in every computing node, so anything
you copy to your home directory will present in each computing node.

## My job creates lots of temporary small files and everything is slow...

The distributed filesystem we use in Baobab (FhGFS) is excellent for
accessing large files but may be slower than a local filesystem when
dealing with small files. In that case, you could try to create the 
temporary files locally using the `/scratch/` directory present in all 
computing nodes.

But pay attention, at the end of the computation, all files in that
directory are automatically deleted. If you need to keep some file,
you can add a line to your slurm batch script to move then in the home
directory at the end of the job.

## How to backup my data ?

The home directories are backuped every night. To avoid backuping
temporary data, you can store them in the `~/scratch/`
directory. Everything you put there is still available to every
computing node, but will not be backuped.

# Applications

## What applications are installed on Baobab ?

The page [applications](#applications) hosts a list of installed software on Baobab. 

If you don't find what you need in the list, it may be installed
however. Just try to use it. 

If you need any additional software, or a different version, contact
us at hpc@unige.ch, we will try to install it for you.

## Can you install the software XYZ on Baobab ?

Check first the list of installed software on [applications](#applications). If it is not
among the listed item, contact us at hpc@unige.ch, we will try to
install the requested software.

## Can I use any MS Windows software ?

Baobab is a GNU/Linux only machine, like the majority of academic
clusters. If you have a windows software that could run on a windows
cluster, contact us at hpc@unige.ch, perhaps we could find some
solutions.

## Can I use a proprietary licensed software ?

Yes we can installed it, but you should pay the required license. Send
us a request at hpc@unige.ch.

## I need a different Linux distributions/version, am I stuck ?

No, you can use *usermod linux* to run the kernel of your choice and
the distribution of your choice. The setup is described in
<http://baobabmaster.unige.ch/enduser/src/enduser/enduser.html#user-mode-linuxlinux>

If you need further help, feel free to contact us at hpc@unige.ch

# Running jobs (SLURM)

## I am already familiar with `torque/pbs/sge/lsf/...`, what are the equivalent concepts in slurm ?

Have a look at this scheduler "rosetta stone", available here:
<http://slurm.schedmd.com/rosetta.pdf>

## Can I run some small test runs in the login node ?

No never. You must use SLURM to run any test. The `debug` partition is
dedicated to small tests.

## My MPI job does not start ?

With SLURM you cannot use `mpirun` to run your jobs, but simply `srun`. For instance given, the
script

[example]

## I want to run several mono-core (sequential) job, how can I run them ?

You can pack 16 mono-core jobs in a single node. You can find an explanation here:

<http://baobabmaster.unige.ch/enduser/src/enduser/enduser.html#monothread-jobs>

If you need further explanations, contact us at hpc@unige.ch

## I want to run several time the same job with different parameters...

In that case you can use the *job arrays* feature of SLURM. Please, have a look
at the documentation here:

<http://baobabmaster.unige.ch/enduser/src/enduser/enduser.html#job-array>

If you need further explanations, contact us at hpc@unige.ch

## What partition should I choose ?

Currently we have four partions: **parallel**, **shared**, **bigmem**, and
**debug**. The criteria to choose the right partition are:

1.  If it just a test, send it to the **debug** partition. It will be
    limited to 15 minutes, but that will be enough to check if
    everything starts fine. On the plus side, two nodes are reserved
    for the debug partition during the day, so you won't need to
    wait much.

2.  If your job needs more than 64GB of RAM (ie. more than 4GB per
    core), you should use the **bigmem** partition. Currently this
    partition has a only a single node, so check before that your job
    cannot run on any other node.

3.  If you have several jobs of less than 12 hours of runtime, use the
    **shared** partition. This partition is larger than the parallel
    partition so your jobs may start earlier. This partition is
    specially recommended for jobs using a single node.

4.  If your job did not fall into any of the three categories above, use
    the **parallel** partition.

## Can I launch a job longer than 4 days ?

No. Unfortunately you can't. If we raised this limit, you will have to
wait longer before having your pending jobs started. We think that the
4 days limit is a good trade-off.

However there could be two work-arounds if you experience an issue with this limit:

1.  Some softwares feature *checkpointing*. During runtime, the program
    will periodically save its current state on the disks. In that
    case, this snapshot may be used to resume the computation by
    another job.  Check if your program allows checkpointing. If you
    cannot find the information, try contacting the develloper or ask
    us at hpc@unige.ch.

2.  You could add private notes to Baobab. In that case the limit will be raised
    to 7 days or even higher. If you are interested, contact us.

## How are the priorities computed ?

A job's priority depends on several factors. The main are:

1.  The *faire-share* value of the user submitting the job. This value
    depends on your past relative usage: the more you've used the
    cluster, the lower the *faire-share* value. Past usage is forgotten
    with time, using an exponential decay formula. The actual
    faire-share computation is a bit hairy and is described in this
    document: <http://slurm.schedmd.com/priority_multifactor.html#fairshare>

2.  The *age* of the job. That value is proportional to the time a job
    spends in the pending queue.

3.  The *size* of the job, proportional to the number of node
    requested. Scheduling large jobs first, allows a better usage
    of the whole cluster.

4.  The *partition* used. Users owning private nodes and using
    the corresponding private partition always a have a greater
    probability.

Those factors are weighted such as to give the faire-share value
the highest impact on the priorities.

To get the priority calculation details of the jobs in the pending
queue, you can use the command: `sprio -l`. You can also have a look
at the weights, by typing =sprio -w".


## My jobs stay a long time in the pending queue...

If you find that the wait time of your jobs is too large, you can
try several strategies to see your code executed before:

1.  Be sure that your job will consume all 16 cores of each node.
    If it's not the case, you can run simulteanously several jobs
    on the same node. For instance, if your computation uses only
    2 threads, you can run 8 of these on a node. [http://baobabmaster.unige.ch/enduser/src/enduser/enduser.html#monothread-jobs]

2.  Shorter jobs are often scheduled earlier. Try to set the walltime
    limit as close as possible to the real execution time of your
    computation.

3.  If the walltime of your jobs is below 12h, you can use the `shared`
    partition which is larger than parallel.

4.  You can buy private nodes. They will be dedicated to your
    computations with high priority.

If you need further explanation or support, contact us at hpc@unige.ch

## Can I run interactive tasks ?

Yes, you can. But it is really awkward because you cannot be sure when
your job will start:

To request a full single node for interactive usage, use the command
`salloc -N1`. This command will block your shell until a node can be
allocated. It will then output:

`salloc: Granted job allocation 114544`

And a sub-shell will be spawned. You can then run shell command in the
allocated node by prefixing them with `srun`. **Attention:** If you
forget the `srun` your job will run on the login node instead, which
terribly impairs the cluster experience.
